import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { UserModel } from '../../../common/models/user.model';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    styleUrls: ['profile.component.css'],
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnDestroy {
    public profile: UserModel;
    private subscription: Subscription;

    constructor(
        private auth: AuthenticationService,
        private titleService: Title,
        private router: Router
    ) {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.auth.profile()
        .subscribe(
            (profile: UserModel): void => {
                this.profile = profile;

                this.titleService.setTitle(`My profile: ${this.profile.name}`);
            },
            (error: HttpErrorResponse): void => {
                if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                    this.router.navigate([`/404`]);
                }
            }
        );
    }

    public ngOnDestroy () {
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }
    }
}
