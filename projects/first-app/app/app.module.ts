import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from '../common/constants/routes.const';
import { BaseComponent } from './components/base/base.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleslatestComponent } from './components/articleslatest/articleslatest.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from '../common/services/authentication.service';
import { AuthGuardService } from '../common/guards/auth.guard';
import { CartmoduleComponent } from './components/cartmodule/cartmodule.component';
import { ManufacturerComponent } from './components/manufacturer/manufacturer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../common/interceptors/token.interceptor';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { CutTextPipe } from '../common/pipes/cut-text.pipe';
import { StripHtmlPipe } from '../common/pipes/striphtml.pipe';
import { ProductsmoduleComponent } from './components/productsmodule/productsmodule.component';
import { SlidermoduleComponent } from './components/slidermodule/slidermodule.component';
registerLocaleData(localeUk, 'uk');
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SafeHtmlPipe } from '../common/pipes/safehtml.pipe';
import { SearchComponent } from './components/search/search.component';
import { WishlistmoduleComponent } from './components/wishlistmodule/wishlistmodule.component';
import { SharedModule } from './shared.module';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LanguagefilterComponent } from './components/languagefilter/languagefilter.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  slidesPerView: 'auto',
  scrollbar: false,
  autoplay: {
    delay: 3000
  },
  a11y: true,
  speed: 2000,
  loop: true,
  navigation: true
};

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HeaderComponent,
    HomePageComponent,
    ProductComponent,
    ArticlesComponent,
    ArticleComponent,
    ArticleslatestComponent,
    CategoryComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    CartmoduleComponent,
    ManufacturerComponent,
    CutTextPipe,
    StripHtmlPipe,
    SafeHtmlPipe,
    ProductsmoduleComponent,
    SlidermoduleComponent,
    SearchComponent,
    WishlistmoduleComponent,
    WishlistComponent,
    LanguagefilterComponent
  ],
  imports: [
    NgbModule,
    BrowserModule.withServerTransition({appId: '1'}),
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    SwiperModule,
    SharedModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
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

export class AppModule {}
