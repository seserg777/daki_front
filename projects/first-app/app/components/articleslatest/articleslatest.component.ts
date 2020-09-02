import { Component, OnDestroy } from '@angular/core';
import { ArticleService } from '../../../common/services/article.service';
import { ArticleModel } from '../../../common/models/article.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-aricleslatest',
    templateUrl: 'articleslatest.component.html',
    styleUrls: ['articleslatest.component.css']
})
export class ArticleslatestComponent implements OnDestroy {
    public articles: ArticleModel[];
    private listStart: string = '0';
    private limit: string = '4';
    private sortBy: string = 'createdAt';
    private sortDir: string = '-1';
    private subscription: Subscription;

    constructor(private postService: ArticleService) {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.postService.getPosts(
            this.listStart,
            this.limit,
            this.sortBy,
            this.sortDir
        ).subscribe((articles: ArticleModel[]): void => {
            this.articles = articles;
        });
    }

    public ngOnDestroy () {
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }
    }
}
