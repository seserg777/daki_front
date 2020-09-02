import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../common/services/article.service';
import { ArticleModel } from '../../../common/models/article.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-aricleedit',
    templateUrl: 'articleedit.component.html'
})
export class ArticleeditComponent implements OnInit {
    public article: ArticleModel = new ArticleModel;
    public submitted: boolean = false;
    public editArticleForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private articleService: ArticleService,
        private router: Router,
        private route: ActivatedRoute,
        private postService: ArticleService,
        private titleService: Title
    ) {}

    public get f() { return this.editArticleForm.controls; }

    public getArticle() {
        const routeParam: string | null = this.route.snapshot.paramMap.get('id');
        if (typeof routeParam === 'string') {
            this.postService.getPost(routeParam)
            .subscribe(
                (article: ArticleModel): void => {
                    this.article = article;

                    this.editArticleForm.controls['title'].setValue(this.article.title);
                    this.editArticleForm.controls['body'].setValue(this.article.body);

                    this.titleService.setTitle(`Edit: ${this.article.title}`);
                },
                (error: HttpErrorResponse): void => {
                    if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                        this.router.navigate([`/404`]);
                    }
                }
            );
        }
    }

    public ngOnInit() {
        this.getArticle();

        this.editArticleForm = this.formBuilder.group({
            title: ['', Validators.required],
            body: ['']
        });
    }

    public onSubmit() {
        this.submitted = true;

        if (this.editArticleForm.invalid) {
            return;
        }

        this.articleService.edit(this.editArticleForm.value.title, this.editArticleForm.value.body, this.article.human_id)
        .subscribe(
            (r: ArticleModel): void => {
                this.router.navigate([`/articles/${r.human_id}`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }
}
