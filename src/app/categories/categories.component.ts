import { Component } from '@angular/core';
import { AppState } from '../app.service';

@Component({
    selector: 'categories',
    templateUrl: './categories.template.html'
})
export class Categories {

    public categories: Array<string> = require('assets/configs/categories.json');

    constructor(
        private appState: AppState
    ) {
        this.appState.set('selectedCategory', 'all');
    }

    showCategory(category: string) {
        this.appState.set('selectedCategory', category);
    }
}
