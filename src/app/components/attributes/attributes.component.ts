import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
//import { of } from 'rxjs/internal/observable/of';
//import { delay } from 'rxjs/operators';
import { AttributeService } from '../../../common/services/attribute.service';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { AttributeModel } from '../../../common/models/attribute.model';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-attributes',
    templateUrl: 'attributes.component.html'
})
export class AttributesComponent implements OnDestroy {
    public attributeSegment: AttributeModel[];

    public paginationParams: PaginationParamsInterface;

    private attributes: AttributeModel[];

    private perPage: number = 5;

    private subscription: Subscription;

    constructor(
      private attributeService: AttributeService,
      private titleService: Title
    ) {
        this.subscription = this.attributeService.getItems().subscribe((attributes: AttributeModel[]): void => {
            this.attributes = attributes;
            this.paginationParams = {
                total: attributes.length,
                perPage: this.perPage,
                current: 1,
                controlsCount: 7
            };
            this.attributeSegment = attributes.slice(0, 5);
            console.log(this.attributes);
        });

        this.titleService.setTitle(`Attributes`);
    }

    public ngOnDestroy () {
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }
    }
}
