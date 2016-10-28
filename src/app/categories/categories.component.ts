import { Component } from '@angular/core';
import { AppState } from '../app.service';

@Component({
    selector: 'categories',
    templateUrl: './categories.template.html'
})
export class Categories {

    public categories: Array<string> = require('assets/configs/categories.json');

    private defaultCategory: String = 'Featured';

    constructor(
        private appState: AppState
    ) {
        this.appState.set('selectedCategory', this.defaultCategory);
    }

    showCategory(category: string) {
        this.appState.set('selectedCategory', category);
    }
}
