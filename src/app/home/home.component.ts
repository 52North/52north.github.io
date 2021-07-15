import { Component, OnInit } from '@angular/core';

import { AppState } from '../app.service';
import { Repository } from '../model';
import { Repositories } from './repository';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.style.css'],
    templateUrl: './home.template.html'
})
export class HomeComponent implements OnInit {

    public repositories: Repository[] = [];
    public sorting: string;

    constructor(
        public repoService: Repositories,
        public appState: AppState
    ) { }

    ngOnInit(): void {
        this.repoService.getSingleRepos().subscribe(repos => {
            this.repositories = repos;
            this.sortByAlphabet();
        });
    }

    textSearch(event: any): void {
        const term = new RegExp(event.target.value, 'gi');
        this.repositories.forEach(entry => {
            if (entry.name && entry.name.match(term)
                || entry.description && entry.description.match(term)) {
                entry.hidden = false;
            } else {
                entry.hidden = true;
            }
        });
    }

    sortByForks(): void {
        this.sorting = 'forks';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.forks_count - entry1.forks_count;
        });
    }

    sortByWatches(): void {
        this.sorting = 'watches';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.watchers_count - entry1.watchers_count;
        });
    }

    sortByStars(): void {
        this.sorting = 'stars';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.stargazers_count - entry1.stargazers_count;
        });
    }

    sortByLastUpdate(): void {
        this.sorting = 'lastUpdates';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return new Date(entry2.pushed_at).getTime() - new Date(entry1.pushed_at).getTime();
        });
    }

    sortByAlphabet(): void {
        this.sorting = 'alphabet';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry1.name.localeCompare(entry2.name);
        });
    }

}
