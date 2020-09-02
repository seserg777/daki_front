import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { HttpService } from './http.service';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthenticationService {
    private token: string = '';

    private user: UserModel;
    private userBS: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.user);

    constructor(
        private http: HttpClient,
        private router: Router,
        private httpservice: HttpService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    public getStateSubscription(): Observable<UserModel> {
        return this.userBS.asObservable();
    }

    public next(user: UserModel): void {
        this.user = user;
        this.userBS.next(this.user);
    }

    public register(user: TokenPayload): Observable<any> {
        return this.request('post', 'register', user);
    }

    public login(user: TokenPayload): Observable<any> {
        return this.request('post', 'login', user);
    }

    public profile(): Observable<any> {
        /*return this.request('get', 'profile');*/
        return this.httpservice.get<KeyValueInterface<any>[], UserModel[]>(
            `${environment.apiUrl}profile`,
            {},
            {}
        );
    }

    public logout(): void {
        console.log('logout');
        this.token = '';
        if (isPlatformBrowser(this.platformId)) {
            /*window.localStorage.removeItem('mean-token');*/
            localStorage.removeItem('mean-token');
        }
        this.next(new UserModel());
        this.router.navigateByUrl('/');
    }

    public getUser(): UserModel|void {
        const token = this.getToken();
        if (token) {
            let payload;
            payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);
            /*console.log(payload);*/
            this.next(new UserModel(payload));
        } else {
            this.next(new UserModel());
        }
    }

    public isLogged(): boolean {
        this.getUser();
        /*console.log(!!this.user, this.user);*/
        if (!!this.user) {
            return this.user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public getToken(): string {
        if (isPlatformBrowser(this.platformId)) {
            const lsToken = localStorage.getItem('mean-token');
            if (lsToken && !this.token) {
                this.token = lsToken;
            }
            return this.token;
        } else {
            return '';
        }
    }

    private saveToken(token: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('mean-token', token);
            this.token = token;
        } else {
            this.token = '';
        }
    }

    private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
        let base;

        if (method === 'post') {
            base = this.http.post(`${environment.apiUrl}${type}`, user);
        } else {
            base = this.http.get(`${environment.apiUrl}${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
        }

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                    this.getUser();
                }
                return data;
            })
        );

        return request;
    }
}
