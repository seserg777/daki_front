import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ArticleModel } from '../models/article.model';

export class ArticleHelper {
  public static createArticleModelFromServerData(data: KeyValueInterface<any>): ArticleModel {
    return new ArticleModel({
        _id: data._id,
        title: data.title,
        body: data.body,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        human_id: data.human_id,
        __v: data.__v
    });
  }

  public static createArticleModel(data: KeyValueInterface<any> = {}): ArticleModel {
    return new ArticleModel({
      _id: data._id,
      title: data.title,
      body: data.body,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      human_id: data.human_id,
      __v: data.__v
    });
  }

  public static createArticleModelArray(data: any[]): ArticleModel[] {
    return data.map((item: KeyValueInterface<any>): ArticleModel => ArticleHelper.createArticleModel(item));
  }

  public static cloneArticleModel(model: ArticleModel): ArticleModel {
    return new ArticleModel({
      _id: model._id,
      title: model.title,
      body: model.body,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      human_id: model.human_id,
      __v: model.__v
    });
  }
}
