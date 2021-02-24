import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from './components/base/base.component';
import { HomePageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { ProductComponent } from './components/product/product.component';
import { AuthenticationService } from '../common/services/authentication.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { CartmoduleComponent } from './components/cartmodule/cartmodule.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../common/interceptors/token.interceptor';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { ProductsmoduleComponent } from './components/productsmodule/productsmodule.component';
registerLocaleData(localeUk, 'uk');
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SafeHtmlPipe } from '../common/pipes/safehtml.pipe';
import { SharedModule } from './shared.module';
import { LanguagefilterComponent } from './components/languagefilter/languagefilter.component';
import { ArticleslatestComponent } from './components/articleslatest/articleslatest.component';
import { HeaderComponent } from './components/header/header.component';
import { SlidermoduleComponent } from './components/slidermodule/slidermodule.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchComponent } from './components/search/search.component';
import { WishlistmoduleComponent } from './components/wishlistmodule/wishlistmodule.component';
import { AppRoutingModule } from './app-routing.module';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  slidesPerView: 'auto',
  scrollbar: false,
  autoplay: {
    delay: 3000
  },
  speed: 2000,
  loop: true,
  navigation: true
};

@NgModule({
  declarations: [
    WishlistmoduleComponent,
    SearchComponent,
    WishlistComponent,
    SlidermoduleComponent,
    HeaderComponent,
    ArticleslatestComponent,
    AppComponent,
    BaseComponent,
    HomePageComponent,
    ProductComponent,
    NotFoundComponent,
    CartmoduleComponent,
    SafeHtmlPipe,
    ProductsmoduleComponent,
    LanguagefilterComponent
  ],
  imports: [
    NgbModule,
    BrowserModule.withServerTransition({ appId: 'daki' }),
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    SharedModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'uk'
    },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
