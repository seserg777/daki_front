import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { StoreService } from '../../../common/services/store.service';

@Component({
    selector: 'app-storeimport',
    templateUrl: 'storeimport.component.html'
})
export class StoreimportComponent {
    public submitted: boolean = false;
    public importForm: FormGroup;
    public formData: FormData = new FormData();

    constructor(
        private storeService: StoreService,
        private formBuilder: FormBuilder,
        private titleService: Title,
    ) {
        this.titleService.setTitle(`Store import`);

        this.importForm = this.formBuilder.group({});
    }

    public get f(): KeyValueInterface<AbstractControl> {
        return this.importForm.controls;
    }

    public onSubmit(type: string): void {
        this.submitted = true;

        if (this.importForm.invalid) {
            return;
        }

        if (this.formData.get(type)) {
            const action = this.storeService.import(
                type,
                this.formData
            );

            action.subscribe(
                (r: KeyValueInterface<any>): void => {
                    console.log(r);
                },
                (error: HttpErrorResponse): void => {
                    console.error(error);
                }
            );
        }
    }

    public onFileChangeHandler(event?: MouseEvent): void {
        const target: HTMLInputElement = event?.target as HTMLInputElement;
        if (!event || !target || !target.files || !target.files.length) {
          return;
        }

        const type = target.dataset.type || '';
        this.formData.append(type, target.files[0]);

        this.onSubmit(type);
    }

    public emitFileInputClick(e?: MouseEvent): void {
        const target: HTMLInputElement = e?.target as HTMLInputElement;
        if (!e || !e.target) {
            return;
        }

        if(!!target) {
            const type = target.dataset.type || '';
            const input: HTMLInputElement = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('data-type', type);
            input.addEventListener(
                'change',
                (event: Event): void => this.onFileChangeHandler(event as MouseEvent)
            );
            input.click();
        }
    }
}
