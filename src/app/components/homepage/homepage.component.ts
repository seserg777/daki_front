import { Component } from '@angular/core';
import { SEOService } from '../../../common/services/seo.service';

@Component({
    selector: 'app-home',
    styleUrls: ['homepage.component.css'],
    templateUrl: 'homepage.component.html'
})

export class HomePageComponent {
    constructor( private seoService: SEOService ) {
        this.seoService.updateTitle('Женские куртки оптом и в розницу. В интернет-магазине DaKi от производителя - недорого');
        this.seoService.updateDescription('Предлагаем купить в нашем интернет-магазине DaKi женские куртки оптом и в розницу недорого. Цена от производителя.\r\nУдобные условия оплаты и доставки.');
    }
}
