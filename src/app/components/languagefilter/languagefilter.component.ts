import { Component } from '@angular/core';
import { LocalstorageService } from '../../../common/services/localstorage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-languagefilter',
    styleUrls: ['languagefilter.component.css'],
    templateUrl: 'languagefilter.component.html'
})
export class LanguagefilterComponent {
    public show: boolean = false;
    public currentLang: string = 'en';

    constructor(
        private localstorageService: LocalstorageService,
        private router: Router
    ) {
        this.currentLang = this.localstorageService.get('locale');
    }

    public change(): void {
        this.show = !this.show;
    }

    public setCurrent(lang: string): void {
        this.show = false;
        this.currentLang = lang;
        this.localstorageService.set('locale', lang);
        this.localstorageService.nextlocale(lang);

        const uri: string = this.router.url;
        const url: string = uri.replace(/\/ru|\/en|/g, '');

        switch (lang) {
            case 'en':
                this.router.navigate([`${url}`]).then(() => {
                    window.location.reload();
                });
                break;

            case 'ru':
                this.router.navigate([`${lang}/${url}`]).then(() => {
                    window.location.reload();
                });
                break;
        }
    }
}
