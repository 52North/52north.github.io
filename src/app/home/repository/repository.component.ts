import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../../model';
import { Repositories } from './repository.service';

@Component({
    selector: 'repository',
    styles: [require('./repository.styles.scss')],
    template: require('./repository.component.html')
})
export class RepositoryComponent implements OnInit {
    @Input()
    repository: Repository;

    protected release: any;

    constructor(
        public repoService: Repositories
    ) { }

    ngOnInit() {
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
