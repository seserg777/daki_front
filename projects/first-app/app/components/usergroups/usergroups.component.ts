import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UsergroupService } from '../../../common/services/usergroup.service';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { UsergroupModel } from '../../../common/models/usergroup.model';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-usergroups',
    templateUrl: 'usergroups.component.html'
})
export class UsergroupsComponent implements OnDestroy {
    public usergroupsSegment: UsergroupModel[];

    public paginationParams: PaginationParamsInterface;

    private usergroups: UsergroupModel[];

    private perPage: number = 5;

    private subscription: Subscription;

    constructor(
      private usergroupService: UsergroupService,
      private titleService: Title
    ) {
        console.log('constructor');
        this.subscription = this.usergroupService.getUsergroups().subscribe((usergroups: UsergroupModel[]): void => {
            this.usergroups = usergroups;
            this.paginationParams = {
                total: usergroups.length,
                perPage: this.perPage,
                current: 1,
                controlsCount: 7
            };
            this.usergroupsSegment = usergroups.slice(0, 5);
            console.log(this.usergroups);
        });

        this.titleService.setTitle(`Users`);
    }

    public ngOnDestroy () {
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }
    }
}
