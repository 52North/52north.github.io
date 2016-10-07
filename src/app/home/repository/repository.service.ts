import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Repository, RepositoryConfig } from '../../model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class Repositories {

    private repoUrl = '/assets/data/';
    private repoReleaseUrl = '/assets/data/release/';

    private additionals: Array<RepositoryConfig> = require('assets/configs/repositories.json');

    constructor(
        private http: Http
    ) { }

    public getSingleRepos(): Observable<Repository[]> {
        let requests: Array<Observable<Repository>> = [];
        this.additionals.forEach(entry => {
            requests.push(this.getRepo(entry));
        });
        return Observable.forkJoin(requests);
    }

    public getRepo(config: RepositoryConfig): Observable<Repository> {
        return this.http.get(this.repoUrl + config.name + '.json')
            .map((res) => {
                return this.extractRepository(res, config);
            })
            .catch(this.handleError);
    }

    public getReleaseOfRepo(repo: Repository): Observable<any> {
        return this.http.get(this.repoReleaseUrl + repo.name + '.json')
            .map((res) => {
                return this.extractRelease(res);
            })
            .catch(this.handleError);
    }

    private extractRepository(res: Response, config: RepositoryConfig) {
        let body = res.json() as Repository;
        body.categories = config.categories;
        return body || {};
    }

    private extractRelease(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
