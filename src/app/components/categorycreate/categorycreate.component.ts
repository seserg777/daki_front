import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CategoryService } from '../../../common/services/category.service';
import { CategoryModel } from '../../../common/models/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';

@Component({
    selector: 'app-categorycreate',
    templateUrl: 'Categorycreate.component.html'
})
export class CategorycreateComponent implements OnInit {
    public submitted: boolean = false;
    public createCategoryForm: FormGroup;
    public categories: CategoryModel[];

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private router: Router
    ) {
        this.categoryService.getCategories().subscribe((categories: CategoryModel[]): void => {
            this.categories = categories;
            /*console.log(this.categories);*/
        });
    }

    public get f(): KeyValueInterface<AbstractControl> {
        return this.createCategoryForm.controls;
    }

    public ngOnInit() {
        this.createCategoryForm = this.formBuilder.group({
            title: ['', Validators.required],
            parent: ['', Validators.required],
            extension: ['', Validators.required]
        });
    }

    public onSubmit(): void {
        this.submitted = true;

        if (this.createCategoryForm.invalid) {
            return;
        }

        this.categoryService.create(
            this.createCategoryForm.value.title,
            this.createCategoryForm.value.extension,
            this.createCategoryForm.value.parent
        )
        .subscribe(
            (r: CategoryModel): void => {
                console.log('CategorycreateComponent Component', r);
                this.router.navigate([`/categories/${r.cid}`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
                // Todo: Handle error
            }
        );
    }
}
