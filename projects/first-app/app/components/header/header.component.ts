import { Component } from '@angular/core';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../common/models/user.model';
import { LocalstorageService } from '../../../common/services/localstorage.service';

@Component({
    selector: 'app-header',
    styleUrls: ['header.component.css'],
    templateUrl: 'header.component.html'
})
export class HeaderComponent {
    public isLoggedIn: boolean;
    public user: UserModel;
    public langPrefix: string = '';
    private lang: string = 'en';

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private localstorageService: LocalstorageService
    ) {
        this.auth.getStateSubscription().subscribe(
            (user: UserModel): void => {
                this.user = user;
            }
        );
        this.isLoggedIn = this.auth.isLogged();
        this.lang = this.localstorageService.get('locale');
        switch (this.lang) {
            case 'en':
                this.langPrefix = '';
                break;

            case 'ru':
                this.langPrefix  = '/ru';
                break;
        }
    }

    public logout() {
        localStorage.setItem('mean-token', '');
        this.router.navigateByUrl('/');
    }
}
