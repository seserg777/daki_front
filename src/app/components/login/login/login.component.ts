import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../../../common/services/authentication.service';

@Component({
    selector: 'app-login',
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    public credentials: TokenPayload = {
        email: '',
        password: ''
    };
    public showModal: boolean;
    public msg: string;

    constructor(private auth: AuthenticationService, private router: Router) {}

    public ShowModal(): void {
        this.showModal = true;
    }

    public HideModal(): void {
        this.showModal = false;
    }

    public login(): void {
        this.auth.login(this.credentials).subscribe(() => {
            this.router.navigate(['/administrator']);
        }, (err) => {
            this.msg = err.error.message;
            this.ShowModal();
        });
    }
}
