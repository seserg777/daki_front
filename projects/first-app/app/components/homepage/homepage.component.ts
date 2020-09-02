import { Component } from '@angular/core';
import { SEOService } from '../../../common/services/seo.service';
import { LocalstorageService } from '../../../common/services/localstorage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    template: `<app-slidermodule></app-slidermodule>
        <app-productsmodule></app-productsmodule>
        <app-aricleslatest></app-aricleslatest>`
})

export class HomePageComponent {
    constructor(
        private seoService: SEOService,
        private localstorageService: LocalstorageService,
        private router: Router
    ) {
        this.seoService.updateTitle('Homepage meta-title');
        this.seoService.updateDescription('Homepage meta-description');

        const lang = this.localstorageService.get('locale');

        const uri: string = this.router.url;
        const url: string = uri.replace(/\/ru|\/en|/g, '');

        if ('/' + lang !== uri && lang !== 'en') {
            this.router.navigate([`${lang}/${url}`]).then(() => {
                window.location.reload();
            });
        }
    }
}
