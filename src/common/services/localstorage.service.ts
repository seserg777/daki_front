import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LocalstorageService {
  private localstorage: Storage = window.localStorage;
  private localeBS: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  private locale: string;

  public getLocaleStateSubscription(): Observable<string> {
    return this.localeBS.asObservable();
  }

  public nextlocale(locale: string): void {
    this.locale = locale;
    console.log('will next locale', this.locale);
    this.localeBS.next(this.locale);
  }

  public get(name: string): string {
    return this.localstorage.getItem(name) || '';
  }

  public set(name: string, value: string): string {
    this.localstorage.setItem(name, value);
    return value;
  }
}

