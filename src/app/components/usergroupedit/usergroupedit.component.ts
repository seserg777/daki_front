import { Component, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsergroupService } from '../../../common/services/usergroup.service';
import { UsergroupModel } from '../../../common/models/usergroup.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription, Observable } from 'rxjs';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-usergroupedit',
    templateUrl: 'usergroupedit.component.html',
    styleUrls: ['usergroupedit.component.css']
})
export class UsergroupeditComponent implements OnDestroy {
    public target: HTMLInputElement;
    public searchSubscription: Subscription;
    public results: KeyValueInterface<any>;
    public environment: KeyValueInterface<any> = environment;
    public faTrashAlt = faTrashAlt;
    public faSave = faSave;
    public usergroup: UsergroupModel = new UsergroupModel;
    public submitted: boolean = false;
    public editUsergroupForm: FormGroup;
    public formData: FormData = new FormData();
    public activeTab: string = 'main';
    private userRemoveSubscribe: Subscription;
    private getUsergroupSubscribe: Subscription;
    private edit: Observable<UsergroupModel>;

    constructor(
        private formBuilder: FormBuilder,
        private usergroupService: UsergroupService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) {
        this.getUsergroup();

        this.editUsergroupForm = this.formBuilder.group({
            usergroup_id: ['', Validators.required],
            title: ['', Validators.required],
            state: ['', Validators.required]
        });
    }

    public get f(): KeyValueInterface<AbstractControl> {
        return this.editUsergroupForm.controls;
    }

    public getUsergroup(): void {
        const routeParam: string | null = this.route.snapshot.paramMap.get('id');
        if (typeof routeParam === 'string') {
            if (!!this.getUsergroupSubscribe) {
                this.getUsergroupSubscribe.unsubscribe();
            }
            this.getUsergroupSubscribe = this.usergroupService.getUsergroup(routeParam)
            .subscribe(
                (usergroup: UsergroupModel): void => {
                    console.log(usergroup);
                    this.usergroup = usergroup;

                    this.editUsergroupForm.controls['usergroup_id'].setValue(this.usergroup.usergroup_id);
                    this.editUsergroupForm.controls['title'].setValue(this.usergroup.title);
                    this.editUsergroupForm.controls['state'].setValue(this.usergroup.state);

                    this.titleService.setTitle(`Edit user#: ${this.usergroup.usergroup_id}`);
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

        if (this.editUsergroupForm.invalid) {
            return;
        }

        this.edit = this.usergroupService.edit(
            this.usergroup.usergroup_id,
            this.editUsergroupForm.value.title,
            this.editUsergroupForm.value.state
        );

        this.edit.subscribe(
            (r: UsergroupModel): void => {
                console.log(r);
                this.usergroup = new UsergroupModel(r);
                this.router.navigate([`/administrator/usergroup/${r.usergroup_id}/edit`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }

    public remove(id: string) {
        this.userRemoveSubscribe = this.usergroupService.remove(id.toString())
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
        if (!!this.getUsergroupSubscribe) {
            this.getUsergroupSubscribe.unsubscribe();
        }
    }
}
