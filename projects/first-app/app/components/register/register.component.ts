import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../../common/services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    styleUrls: ['register.component.css'],
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    public credentials: TokenPayload = {
      email: '',
      name: '',
      password: ''
    };

    constructor(private auth: AuthenticationService, private router: Router) {}

    public register() {
        this.auth.register(this.credentials).subscribe(() => {
          this.router.navigateByUrl('/profile');
        }, (err) => {
          console.error(err);
        });
    }
}
