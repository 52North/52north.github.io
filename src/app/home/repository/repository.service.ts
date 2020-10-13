import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import additionalsJSON from '../../../assets/configs/repositories.json';
import { Repository, RepositoryConfig } from '../../model';

@Injectable()
export class Repositories {

    private repoUrl = 'assets/data/';
    private repoReleaseUrl = 'assets/data/release/';

    constructor(
        private http: HttpClient
    ) { }

    public getSingleRepos(): Observable<Repository[]> {
        const requests: Array<Observable<Repository>> = [];
        additionalsJSON.forEach(entry => {
            requests.push(this.getRepo(entry));
        });
        return forkJoin(requests);
    }

    public getRepo(config: RepositoryConfig): Observable<Repository> {
        return this.http.get<Repository>(this.repoUrl + config.name + '.json')
            .pipe(
                map((res) => this.extractRepository(res, config)),
                catchError(this.handleError)
            );
    }

    public getReleaseOfRepo(repo: Repository): Observable<any> {
        return this.http.get(this.repoReleaseUrl + repo.name + '.json')
            .pipe(
                // map((res) => this.extractRelease(res)),
                catchError(this.handleError)
            );
    }

    private extractRepository(res: Repository, config: RepositoryConfig): Repository {
        res.categories = config.categories;
        return res;
    }

    // private extractRelease(res: any) {
    //     debugger;
    //     let body = res.json();
    //     return body;
    // }

    private handleError(error: any): Observable<any> {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return of(errMsg);
    }
}
