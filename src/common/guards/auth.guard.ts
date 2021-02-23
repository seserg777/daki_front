import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../common/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    public isLoggedIn: boolean;

    constructor(private auth: AuthenticationService, private router: Router) {}

    public canActivate(): boolean {
        this.router.navigate(['/login']);
        return this.auth.isLogged();
    }
}
