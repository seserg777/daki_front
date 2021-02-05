import { Component, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
    selector: 'app-slidermodule',
    templateUrl: 'slidermodule.component.html',
    styleUrls: ['slidermodule.component.css']
})
export class SlidermoduleComponent {
    @ViewChild( SwiperComponent, { read: false } ) public componentRef?: SwiperComponent;

    @ViewChild( SwiperDirective, { read: false } ) public directiveRef?: SwiperDirective;

    public show: boolean = true;

    public slides = [
        '<img rel="preload" as="image" src="https://deps.ua/images/banners/akcii/2018/01/01/1362_ru.jpg" class="slide-img" />',
        '<img rel="preload" as="image" src="https://deps.ua/images/banners/akcii/2018/02/1362_RU.jpg" class="slide-img" />'
    ];

    public type: string = 'component';

    public disabled: boolean = false;

    public config: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        scrollbar: false,
        navigation: true,
        pagination: false
    };

    private scrollbar: SwiperScrollbarInterface = {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true
    };

    private pagination: SwiperPaginationInterface = {
        el: '.swiper-pagination',
        clickable: true,
        hideOnClick: false
    };

    constructor() {}

    public toggleType(): void {
        this.type = (this.type === 'component') ? 'directive' : 'component';
    }

    public toggleDisabled(): void {
        this.disabled = !this.disabled;
    }

    public toggleDirection(): void {
        this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
    }

    public toggleSlidesPerView(): void {
        if (this.config.slidesPerView !== 1) {
        this.config.slidesPerView = 1;
        } else {
        this.config.slidesPerView = 2;
        }
    }

    public toggleOverlayControls(): void {
        if (this.config.navigation) {
        this.config.scrollbar = false;
        this.config.navigation = false;

        this.config.pagination = this.pagination;
        } else if (this.config.pagination) {
        this.config.navigation = false;
        this.config.pagination = false;

        this.config.scrollbar = this.scrollbar;
        } else {
        this.config.scrollbar = false;
        this.config.pagination = false;

        this.config.navigation = true;
        }

        if (this.type === 'directive' && this.directiveRef) {
        this.directiveRef.setIndex(0);
        } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
        this.componentRef.directiveRef.setIndex(0);
        }
    }

    public toggleKeyboardControl(): void {
        this.config.keyboard = !this.config.keyboard;
    }

    public toggleMouseWheelControl(): void {
        this.config.mousewheel = !this.config.mousewheel;
    }

    public onIndexChange(index: number): void {
        console.log(index);
    }

    public onSwiperEvent(event: string): void {
        console.log(event);
    }
}
