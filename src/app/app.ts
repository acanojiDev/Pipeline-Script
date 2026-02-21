import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from './environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  version = environment.version;
  protected readonly title = signal(this.version);
}
