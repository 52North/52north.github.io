import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Repository } from './repository';
import { RepositoryConfig } from './repoConfig';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class Repositories {

  private repoUrl = "https://api.github.com/repos/52North/";

  private additionals: Array<RepositoryConfig> = require('assets/configs/repositories.json');

  constructor(
    private http: Http
  ) { }

  getSingleRepos(): Observable<Repository[]> {
    let requests: Array<Observable<Repository>> = [];
    this.additionals.forEach(entry => {
      requests.push(this.getRepo(entry));
    })
    return Observable.forkJoin(requests);
  }

  getRepo(config: RepositoryConfig): Observable<Repository> {
    return this.http.get(this.repoUrl + config.name)
      .map((res) => {
        return this.extractData(res, config);
      })
      .catch(this.handleError);
  }

  private extractData(res: Response, config: RepositoryConfig) {
    let body = res.json() as Repository;
    body.categories = config.categories;
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
