import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../../../common/services/user.service';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { UserModel } from '../../../common/models/user.model';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnDestroy {
    public usersSegment: UserModel[];

    public paginationParams: PaginationParamsInterface;

    private users: UserModel[];

    private perPage: number = 5;

    private subscription: Subscription;

    constructor(
      private userService: UserService,
      private titleService: Title
    ) {
        this.subscription = this.userService.getUsers().subscribe((users: UserModel[]): void => {
            this.users = users;
            this.paginationParams = {
                total: users.length,
                perPage: this.perPage,
                current: 1,
                controlsCount: 7
            };
            this.usersSegment = users.slice(0, 5);
            console.log(this.users);
        });

        this.titleService.setTitle(`Users`);
    }

    public ngOnDestroy () {
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }
    }
}
