import { Component } from '@angular/core';
import { SEOService } from '../../../common/services/seo.service';

@Component({
    selector: 'app-home',
    styleUrls: ['homepage.component.css'],
    templateUrl: 'homepage.component.html'
})

export class HomePageComponent {
    constructor( private seoService: SEOService ) {
        this.seoService.updateTitle('Homepage meta-title');
        this.seoService.updateDescription('Homepage meta-description');
    }
}
