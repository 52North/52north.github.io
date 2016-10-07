import { Component, OnInit } from '@angular/core';
import { Repository } from '../model';
import { Repositories, RepositoryComponent } from './repository';

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
  styleUrls: [ './home.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html'
})
export class Home implements OnInit {
  repositories = new Array<Repository>();

  protected selectedCategory = 'all';

  private categories: Array<string> = require('assets/configs/categories.json');

  constructor(
    public repoService: Repositories
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
      return new Date(entry2.updated_at).getTime() - new Date(entry1.updated_at).getTime();
    });
  }

  showCategory(category: string) {
    this.selectedCategory = category;
  }
}
