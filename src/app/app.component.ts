import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./app.style.css')
    ],
    template: require('./app.component.html')
})
export class App {
    // angularclassLogo = 'assets/img/angularclass-avatar.png';
    name = '52°North @ GitHub';
    // url = 'https://twitter.com/AngularClass';

    constructor(public appState: AppState) { }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

}
