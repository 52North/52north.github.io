import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../../model';

@Component({
  selector: 'repository',
  providers: [],
  directives: [],
  pipes: [],
  template: require('./repository.component.html')
})
export class RepositoryComponent implements OnInit{
  @Input()
  repository: Repository;

  ngOnInit() {
  }
  
  public toRepository(): void {
    window.open("https://github.com/" + this.repository.full_name);
  }
  
  public getLastUpdated(): Date {
    return new Date(this.repository.updated_at);
  }

}
