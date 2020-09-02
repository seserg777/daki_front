import { Component   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturerModel } from '../../../common/models/manufacturer.model';
import { ManufacturerService } from '../../../common/services/manufacturer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { AuthenticationService } from '../../../common/services/authentication.service';

@Component({
    selector: 'app-manufacturer',
    templateUrl: 'manufacturer.component.html'
})
export class ManufacturerComponent {
    public manufacturer: ManufacturerModel = new ManufacturerModel;
    public faEdit = faEdit;
    public faTrashAlt = faTrashAlt;
    public isLoggedIn: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private manufacturerService: ManufacturerService,
        private auth: AuthenticationService
    ) {
        this.getItem();
        this.isLoggedIn = this.auth.isLogged();
    }

    public getItem() {
        const routeParam: string | null = this.route.snapshot.paramMap.get('id');
        /*console.log(`ManufacturerComponent getItem id:${routeParam}`);*/
        if (typeof routeParam === 'string') {
            this.manufacturerService.getItem(routeParam)
            .subscribe(
                (manufacturer: ManufacturerModel): void => {
                    this.manufacturer = manufacturer;

                    this.titleService.setTitle(`${this.manufacturer.title}`);
                },
                (error: HttpErrorResponse): void => {
                    if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                        this.router.navigate([`/404`]);
                    }
                }
            );
        }
    }

    public remove(manufacturer_id: number) {
        this.manufacturerService.remove(manufacturer_id.toString())
        .subscribe(
            (r: KeyValueInterface<any>): void => {
                console.log(r);
                this.router.navigate([`/manufacturers`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }
}
