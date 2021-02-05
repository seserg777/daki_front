import { Component, OnDestroy } from '@angular/core';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MediaService } from '../../../common/services/media.service';
import { of } from 'rxjs/internal/observable/of';
import { MediaModel } from '../../../common/models/media.model';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';

@Component({
    selector: 'app-mediamanager',
    styleUrls: ['mediamanager.component.css'],
    templateUrl: 'mediamanager.component.html'
})
export class MediamanagerComponent implements OnDestroy {
    public startIndex: number = 0;
    public sortBy: string = 'id';
    public sortDir: string = '-1';
    public mediaSegment: MediaModel[];
    public paginationParams: PaginationParamsInterface;
    public faTrashAlt = faTrashAlt;
    public list: MediaModel[];
    public environment: KeyValueInterface<any> = environment;
    private perPage: number = 15;
    private listSubscription: Subscription;
    private paginationSubscription: Subscription;

    constructor(
        private mediaService: MediaService,
        private titleService: Title
    ) {
        this.getItems();
        this.titleService.setTitle(`Mediamanager`);
    }

    public getItems(): void {
        if (!!this.listSubscription) {
          this.listSubscription.unsubscribe();
        }

        this.listSubscription = this.mediaService.getItems(
            'all',
            this.startIndex.toString(),
            this.perPage.toString(),
            this.sortBy,
            this.sortDir,
        ).subscribe(
          (list: MediaModel[]): void => {
            this.list = list;
            console.log(this.list);
          }
        );
    }

    public paginate(offset: number): void {
        if (!!this.paginationSubscription) {
            this.paginationSubscription.unsubscribe();
        }

        this.paginationSubscription = of<number>(offset)
        .subscribe(
            (o: number): void => {
                this.startIndex = (Math.ceil(o) - 1) * this.paginationParams.perPage;
                this.paginationParams = { ... this.paginationParams, current: Math.ceil(o) };
                this.getItems();
                if (!!this.paginationSubscription) {
                    this.paginationSubscription.unsubscribe();
                }
            }
        );
    }

    public deleteMedia(item: MediaModel): void {
        console.log('will delete', item);
    }

    public ngOnDestroy(): void {
        if (!!this.listSubscription) {
            this.listSubscription.unsubscribe();
        }
    }
}
