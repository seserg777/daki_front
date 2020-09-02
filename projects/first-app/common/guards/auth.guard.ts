import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../common/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    public isLoggedIn: boolean;

    constructor(private auth: AuthenticationService) {}

    public canActivate(): boolean {
        return this.auth.isLogged();
    }
}
