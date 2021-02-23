import { Component, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../../common/services/user.service';
import { UserModel } from '../../../common/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { merge, Subscription, Observable } from 'rxjs';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-useredit',
    templateUrl: 'useredit.component.html',
    styleUrls: ['useredit.component.css']
})
export class UsereditComponent implements OnDestroy {
    public target: HTMLInputElement;
    public searchSubscription: Subscription;
    public results: KeyValueInterface<any>;
    public environment: KeyValueInterface<any> = environment;
    public faTrashAlt = faTrashAlt;
    public faSave = faSave;
    public user: UserModel = new UserModel;
    public submitted: boolean = false;
    public editUserForm: FormGroup;
    public formData: FormData = new FormData();
    public activeTab: string = 'main';
    private userRemoveSubscribe: Subscription;
    private getUserSubscribe: Subscription;
    private edit: Observable<UserModel>;
    private merged: Observable<UserModel>;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) {
        this.getUser();

        this.editUserForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['']
        });
    }

    public get f(): KeyValueInterface<AbstractControl> {
        return this.editUserForm.controls;
    }

    public getUser(): void {
        const routeParam: string | null = this.route.snapshot.paramMap.get('id');
        if (typeof routeParam === 'string') {
            if (!!this.getUserSubscribe) {
                this.getUserSubscribe.unsubscribe();
            }
            this.getUserSubscribe = this.userService.getUser(routeParam)
            .subscribe(
                (user: UserModel): void => {
                    console.log(user);
                    this.user = user;

                    this.editUserForm.controls['name'].setValue(this.user.name);
                    this.editUserForm.controls['email'].setValue(this.user.email);

                    this.titleService.setTitle(`Edit user#: ${this.user.id}`);
                },
                (error: HttpErrorResponse): void => {
                    if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                        this.router.navigate([`/404`]);
                    }
                }
            );
        }
    }

    public onSubmit(): void {
        /*console.log('onSubmit');*/
        this.submitted = true;

        if (this.editUserForm.invalid) {
            return;
        }

        this.edit = this.userService.edit(
            this.user.id,
            this.editUserForm.value.name,
            this.editUserForm.value.email
        );

        const media = this.userService.media(
            this.user.id,
            this.formData
        );

        this.merged = merge(this.edit, media);

        this.merged.subscribe(
            (r: UserModel): void => {
                console.log(r);
                this.user = new UserModel(r);
                this.router.navigate([`/administrator/users/${r.id}/edit`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }

    public onFileChangeHandler(type: string, event?: MouseEvent, id?: string): void {
        const target: HTMLInputElement = event?.target as HTMLInputElement;
        if (!event || !event.target || !target.files || !target.files.length) {
          return;
        }

        switch (type) {
            case 'image': {
                this.formData.append(`files[${type}][${id}]`, target.files[0]);
                /*console.log(this.formData.get(`files[${type}][${id}]`));*/
                break;
            }

            case 'attr_value_image': {
                this.formData.append(`files[${type}][${id}]`, target.files[0]);
                /*console.log(this.formData.get(`files[${type}][${id}]`));*/
                break;
            }
        }
    }

    public emitFileInputClick(): void {
        const input: HTMLInputElement = document.createElement('input');
        input.setAttribute('type', 'file');
        input.addEventListener(
            'change',
            (event: Event): void => this.onFileChangeHandler('image', event as MouseEvent, this.user.id)
        );
        input.click();
    }

    public removeMedia(): void {
        console.log('removeMedia');
    }

    public changeTab(anchor: string): void {
        this.activeTab = anchor;
    }

    public remove(id: string) {
        this.userRemoveSubscribe = this.userService.remove(id.toString())
        .subscribe(
            (r: KeyValueInterface<any>): void => {
                console.log(r);
                this.router.navigate([`/users`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }

    public ngOnDestroy(): void {
        if (!!this.userRemoveSubscribe) {
            this.userRemoveSubscribe.unsubscribe();
        }
        if (!!this.getUserSubscribe) {
            this.getUserSubscribe.unsubscribe();
        }
    }
}
