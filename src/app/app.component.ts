import { Component } from '@angular/core';

import { AppState } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '52°North @ GitHub';

  constructor(
    public appState: AppState
  ) { }
}
