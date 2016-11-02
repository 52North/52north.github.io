import { Component, OnInit } from '@angular/core';
import { Repository } from '../model';
import { Repositories } from './repository';
import { AppState } from '../app.service';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Repositories
    ],
    // Our list of styles in our component. We may add more to compose many styles together
    styleUrls: ['./home.style.css'],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.template.html'
})
export class Home implements OnInit {
    public repositories = new Array<Repository>();
    public sorting: string;

    constructor(
        public repoService: Repositories,
        public appState: AppState
    ) { }

    ngOnInit() {
        this.repoService.getSingleRepos().subscribe(repos => {
            this.repositories = repos;
            this.sortByAlphabet();
        });
    }

    textSearch(event: any) {
        let term = new RegExp(event.target.value, 'gi');
        this.repositories.forEach(entry => {
            if (entry.name.match(term) || entry.description.match(term)) {
                entry.hidden = false;
            } else {
                entry.hidden = true;
            }
        });
    }

    sortByForks() {
        this.sorting = 'forks';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.forks_count - entry1.forks_count;
        });
    }

    sortByWatches() {
        this.sorting = 'watches';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.watchers_count - entry1.watchers_count;
        });
    }

    sortByStars() {
        this.sorting = 'stars';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.stargazers_count - entry1.stargazers_count;
        });
    }

    sortByLastUpdate() {
        this.sorting = 'lastUpdates';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return new Date(entry2.pushed_at).getTime() - new Date(entry1.pushed_at).getTime();
        });
    }

    sortByAlphabet() {
        this.sorting = 'alphabet';
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry1.name.localeCompare(entry2.name);
        });
    }

}
