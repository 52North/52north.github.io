import { Component } from '@angular/core';

import CategoriesJson from '../../assets/configs/categories.json';
import { AppState } from '../app.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.template.html'
})
export class CategoriesComponent {

    private defaultCategory = 'Featured';

    public categories = CategoriesJson;

    constructor(
        public appState: AppState
    ) {
        this.appState.set('selectedCategory', this.defaultCategory);
    }

    showCategory(category: string): void {
        this.appState.set('selectedCategory', category);
    }
}
