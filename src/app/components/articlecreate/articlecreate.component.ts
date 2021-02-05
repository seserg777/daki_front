import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../common/services/article.service';
import { ArticleModel } from '../../../common/models/article.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ariclecreate',
    templateUrl: 'articlecreate.component.html'
})
export class ArticlecreateComponent implements OnInit {
    public submitted: boolean = false;
    public createArticleForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private articleService: ArticleService,
        private router: Router
    ) {}

    public get f() { return this.createArticleForm.controls; }

    public ngOnInit() {
        this.createArticleForm = this.formBuilder.group({
            title: ['', Validators.required],
            body: ['']
        });
    }

    public onSubmit() {
        this.submitted = true;

        if (this.createArticleForm.invalid) {
            return;
        }

        this.articleService.create(this.createArticleForm.value.title, this.createArticleForm.value.body)
        .subscribe(
            (r: ArticleModel): void => {
                console.log('ArticlecreateComponent Component', r);
                this.router.navigate([`/articles/${r.human_id}`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
                // Todo: Handle error
            }

        );
    }
}
