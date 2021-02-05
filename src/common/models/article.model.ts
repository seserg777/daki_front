import { ArticleInterface } from '../interfaces/article.interface';

export class ArticleModel implements ArticleInterface {
    public _id: string;
    public title: string;
    public body: string;
    public createdAt: string;
    public updatedAt: string;
    public human_id: string;
    public  __v: string;

    constructor(params: ArticleInterface = {} as ArticleInterface) {
        this._id = params._id;
        this.title = params.title;
        this.body = params.body;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.human_id = params.human_id;
        this.__v = params.__v;
    }
}
