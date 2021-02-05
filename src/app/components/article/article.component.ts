import { Component, OnInit   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleModel } from '../../../common/models/article.model';
import { ArticleService } from '../../../common/services/article.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { AuthenticationService } from '../../../common/services/authentication.service';

@Component({
    selector: 'app-aricle',
    templateUrl: 'article.component.html'
})
export class ArticleComponent implements OnInit {
    public article: ArticleModel = new ArticleModel;
    public faEdit = faEdit;
    public faTrashAlt = faTrashAlt;
    public isLoggedIn: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private articleService: ArticleService,
        private auth: AuthenticationService
    ) {
        this.isLoggedIn = this.auth.isLogged();
    }

    public getArticle() {
        const routeParam: string | null = this.route.snapshot.paramMap.get('id');
        if (typeof routeParam === 'string') {
            this.articleService.getPost(routeParam)
            .subscribe(
                (article: ArticleModel): void => {
                    this.article = article;

                    this.titleService.setTitle(`${this.article.title}`);
                },
                (error: HttpErrorResponse): void => {
                    if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                        this.router.navigate([`/404`]);
                    }
                }
            );
        }
    }

    public remove(id) {
        console.log('remove ' + id);

        this.articleService.remove(id)
        .subscribe(
            (r: KeyValueInterface<any>): void => {
                console.log(r);
                this.router.navigate([`/articles`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }

    public ngOnInit() {
        this.getArticle();
    }
}
