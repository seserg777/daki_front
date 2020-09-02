import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
import { ArticleService } from '../../../common/services/article.service';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { ArticleModel } from '../../../common/models/article.model';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-aricles',
    templateUrl: 'articles.component.html'
})
export class ArticlesComponent {
    public articleSegment: ArticleModel[];

    public paginationParams: PaginationParamsInterface;

    private articles: ArticleModel[];

    private perPage: number = 5;

    private subscription: Subscription;

    constructor(
      private postService: ArticleService,
      private titleService: Title
    ) {
        this.postService.getPosts().subscribe((articles: ArticleModel[]): void => {
          this.articles = articles;
          this.paginationParams = {
            total: articles.length,
            perPage: this.perPage,
            current: 1,
            controlsCount: 7
          };
          this.articleSegment = articles.slice(0, 5);
        });

        this.titleService.setTitle(`Articles`);
    }

    public getArticles(offset: number): void {
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }

        this.subscription = of<number>(offset)
        .pipe<number>(delay<number>(2000))
        .subscribe(
          (o: number): void => {
              const startIndex: number = (o - 1) * this.paginationParams.perPage;
              this.paginationParams = { ... this.paginationParams, current: o };
              this.articleSegment = this.articles.slice(startIndex, startIndex + this.paginationParams.perPage);
              this.subscription.unsubscribe();
          }
        );
    }
}
