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
    repositories = new Array<Repository>();

    constructor(
        public repoService: Repositories,
        public appState: AppState
    ) { }

    ngOnInit() {
        this.repoService.getSingleRepos().subscribe(repos => this.repositories = repos);
    }

    sortByForks() {
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.forks_count - entry1.forks_count;
        });
    }

    sortByWatches() {
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.watchers_count - entry1.watchers_count;
        });
    }

    sortByStars() {
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return entry2.stargazers_count - entry1.stargazers_count;
        });
    }

    sortByLastUpdate() {
        this.repositories = this.repositories.sort((entry1, entry2) => {
            return new Date(entry2.pushed_at).getTime() - new Date(entry1.pushed_at).getTime();
        });
    }

}
