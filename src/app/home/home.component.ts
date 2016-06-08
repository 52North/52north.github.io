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
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    RepositoryComponent
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./home.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.component.html')
})
export class Home implements OnInit {
  repositories = new Array<Repository>();

  private categories: Array<string> = require('assets/configs/categories.json');

  selectedCategory = "all";

  constructor(
    public repoService: Repositories
  ) { }

  ngOnInit() {
    this.repoService.getSingleRepos().subscribe(repos => this.repositories = repos);
  }

  sortByForks() {
    this.repositories = this.repositories.sort((entry1, entry2) => {
      return entry2.forks_count - entry1.forks_count
    });
  }

  sortByWatches() {
    this.repositories = this.repositories.sort((entry1, entry2) => {
      return entry2.watchers_count - entry1.watchers_count
    });
  }

  sortByStars() {
    this.repositories = this.repositories.sort((entry1, entry2) => {
      return entry2.stargazers_count - entry1.stargazers_count
    });
  }

  sortByLastUpdate() {
    this.repositories = this.repositories.sort((entry1, entry2) => {
      return new Date(entry2.updated_at).getTime() - new Date(entry1.updated_at).getTime()
    });
  }

  showCategory(category: string) {
    this.selectedCategory = category;
  }
}
