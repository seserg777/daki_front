import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ManufacturerService } from '../../../common/services/manufacturer.service';
import { ManufacturerModel } from '../../../common/models/manufacturer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';

@Component({
    selector: 'app-manufacturercreate',
    templateUrl: 'manufacturercreate.component.html'
})
export class ManufacturercreateComponent implements OnInit {
    public submitted: boolean = false;
    public createManufacturerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private manufacturerService: ManufacturerService,
        private router: Router
    ) {}

    public get f(): KeyValueInterface<AbstractControl> {
        return this.createManufacturerForm.controls;
    }

    public ngOnInit() {
        this.createManufacturerForm = this.formBuilder.group({
            title: ['', Validators.required],
            short_description: [''],
            description: ['']
        });
    }

    public onSubmit(): void {
        this.submitted = true;

        if (this.createManufacturerForm.invalid) {
            return;
        }

        this.manufacturerService.create(
            this.createManufacturerForm.value.title,
            this.createManufacturerForm.value.short_description,
            this.createManufacturerForm.value.description
        )
        .subscribe(
            (r: ManufacturerModel): void => {
                /*console.log('manufacturercreateComponent Component', r);*/
                this.router.navigate([`/manufacturers/${r.manufacturer_id}`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }
}
