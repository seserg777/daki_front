import { enableProdMode, TRANSLATIONS_FORMAT, TRANSLATIONS } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReflectiveInjector } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LocalstorageService } from './common/services/localstorage.service';

if (environment.production) {
  enableProdMode();
}

const injector = ReflectiveInjector.resolveAndCreate([LocalstorageService]);
const localstorageService = injector.get(LocalstorageService);
let locale: string = 'en';

const localsorageLocale: string = localstorageService.get('locale');
if (!!localsorageLocale) {
  console.log('find in localstorage', localsorageLocale);
  locale = localsorageLocale;
}

/*if (localstorageService.get('locale') === null) {
  localstorageService.set('locale', 'en');
}
const locale = localstorageService.get('locale');*/
declare const require;
const translations = require(`raw-loader!./locale/messages.${locale}.xlf`);

platformBrowserDynamic().bootstrapModule(
  AppModule, {
    providers: [
      {provide: TRANSLATIONS, useValue: translations},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
    ]
  }
)
.catch(err => console.error(err));
