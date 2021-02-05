import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttributeService } from '../../../common/services/attribute.service';
import { AttributeModel } from '../../../common/models/attribute.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-attributeedit',
    templateUrl: 'attributeedit.component.html'
})
export class AttributeeditComponent implements OnInit {
    public submitted: boolean = false;
    public editAttributeForm: FormGroup;
    public attribute: AttributeModel;

    constructor(
        private formBuilder: FormBuilder,
        private attributeService: AttributeService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) {
        this.getItem();
    }

    public getItem() {
        const routeParam: string | null = this.route.snapshot.paramMap.get('id');
        console.log(routeParam, typeof routeParam);
        if (typeof routeParam === 'string' && routeParam !== 'edit') {
            this.attributeService.getItem(routeParam)
            .subscribe(
                (attribute: AttributeModel): void => {
                    this.attribute = attribute;

                    if (!!attribute) {
                        this.editAttributeForm.controls['title'].setValue(this.attribute.title);
                        this.editAttributeForm.controls['type'].setValue(this.attribute.type);
                        this.editAttributeForm.controls['show_title'].setValue(this.attribute.show_title);

                        this.titleService.setTitle(`Edit: ${this.attribute.title}`);
                    }
                },
                (error: HttpErrorResponse): void => {
                    if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                        this.router.navigate([`/404`]);
                    }
                }
            );
        } else {
            console.log('qqq');
        }
    }

    public get f() { return this.editAttributeForm.controls; }

    public ngOnInit() {
        this.editAttributeForm = this.formBuilder.group({
            attr_id: [''],
            title: ['', Validators.required],
            type: ['', Validators.required],
            show_title: ['', Validators.required],
            image: ['']
        });
    }

    public onSubmit() {
        this.submitted = true;

        if (this.editAttributeForm.invalid) {
            return;
        }

        this.attributeService.create(
            this.editAttributeForm.value.attr_id,
            this.editAttributeForm.value.type,
            this.editAttributeForm.value.title,
            this.editAttributeForm.value.show_title,
            this.editAttributeForm.value.image
        )
        .subscribe(
            (r: AttributeModel): void => {
                console.log('AttributeeditComponent Component', r);
                this.router.navigate([`/administrator/products/attributes/${r.attr_id}`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
                // Todo: Handle error
            }

        );
    }

    public emitFileInputClick() {

    }
}
