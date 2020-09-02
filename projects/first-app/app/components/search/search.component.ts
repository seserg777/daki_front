import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SearchService } from '../../../common/services/search.service';
import { SearchresultModel } from '../../../common/models/searchresult.model';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { LayoutService } from '../../../common/services/layout.service';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent implements OnDestroy {
    public target: HTMLInputElement;
    public subscription: Subscription;
    public results: KeyValueInterface<any>;

    constructor(
        private searchService: SearchService,
        private layoutService: LayoutService
    ) {
        this.layoutService.onBodyClick.subscribe((event: MouseEvent): void => {
            if (!!event) {
                delete this.results;
                if (!!this.target) {
                    this.target.value = '';
                }
            }
        });
    }

    public search(event: HTMLInputEvent ): void {
        //console.log('search');
        this.target = event.target;
        if ( event.target.value.length === 0 ) {
            this.results = {
                products: [],
                articles: []
            }
        }
        if ( event.target.value.length > 2 ) {
            if (!!this.subscription) {
            this.subscription.unsubscribe();
            }

            this.subscription = this.searchService.search(
                '0',
                '6',
                'title',
                '1',
                event.target.value
            ).subscribe((results: SearchresultModel[]): void => {
                this.results = {
                    products: [],
                    articles: []
                }
                for (const i of Object.keys(results)) {
                    switch (results[i]['type']) {
                        case 'product':
                            this.results['products'].push(results[i]);
                            break;
                        case 'article':
                            this.results['articles'].push(results[i]);
                            break;
                    }
                }
            });
        }
    }

    public ngOnDestroy () {
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }
    }
}
