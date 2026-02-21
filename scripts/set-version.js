/**
 * 🔹 set-version.js
 *
 * Este script actualiza automáticamente la versión en package.json
 * según el tag del commit desplegado en Git.
 *
 * Flujo:
 * 1. Obtiene el tag más cercano al commit actual usando git.
 * 2. Si no hay tag, usa un fallback "0.0.0".
 * 3. Lee package.json de la raíz del proyecto.
 * 4. Sustituye la propiedad "version" con el tag detectado.
 * 5. Guarda los cambios en package.json.
 *
 * Esto permite que Angular, al compilar o hacer build,
 * tenga siempre la versión correcta del tag desplegado,
 * sin necesidad de modificar manualmente package.json.
 */

const fs = require("fs"); //Módulo de Node para leer/escribir archivios
const { execSync } = require("child_process"); //ejecuta comandos shell

function getTag(){
	try{
		//Obtiene el tag mas cercano al commit actual
		// --abbrev=0 devuelve solo el nombre del tag
		return execSync("git describe --tags --abbrev=0").toString().trim();
	}catch{
		//Si el commit no tiene tags cercanos
		return "0.0.0";
	}
}

const version = getTag();

//Leer package.json
const packageJsonPath = "package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

//Actualizar la version con el tag detectado
packageJson.version = version;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`package.json actualizado a version ${version}`);
