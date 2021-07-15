import { Component, Input, OnInit } from '@angular/core';

import { Repository } from '../../model';
import { Repositories } from './repository.service';

@Component({
    selector: 'app-repository',
    styleUrls: ['./repository.styles.scss'],
    templateUrl: './repository.component.html'
})
export class RepositoryComponent implements OnInit {

    @Input() public repository: Repository;

    public release: any;

    public lang = navigator.language;

    constructor(
        public repoService: Repositories
    ) { }

    ngOnInit(): void {
        this.repoService.getReleaseOfRepo(this.repository)
            .subscribe(release => this.release = release);
    }

    public toRepository(): void {
        window.open('https://github.com/' + this.repository.full_name);
    }

    public toRelease(): void {
        window.open('https://github.com/' + this.repository.full_name
            + '/releases/tag/' + this.release.tag_name);
    }

    public getLastUpdated(): Date {
        return new Date(this.repository.updated_at);
    }
}
