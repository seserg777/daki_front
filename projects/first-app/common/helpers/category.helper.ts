import { KeyValueInterface } from '../interfaces/key-value.interface';
import { CategoryModel } from '../models/category.model';
import { CategoryformoduleModel } from '../models/categoryformodule.model';

export class CategoryHelper {
  public static createCategoryModelFromServerData(data: KeyValueInterface<any>): CategoryModel {
    return new CategoryModel({
        _id: data._id,
        title: data.title,
        slug: data.slug,
        parent: data.parent,
        extension: data.extension,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        cid: data.cid,
        description: data.description,
        __v: data.__v,
        childs: data.childs
    });
  }

  public static createCategoryModel(data: KeyValueInterface<any> = {}): CategoryModel {
    return new CategoryModel({
      _id: data._id,
      title: data.title,
      slug: data.slug,
      parent: data.parent,
      extension: data.extension,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      cid: data.cid,
      description: data.description,
      __v: data.__v,
      childs: data.childs
    });
  }

  public static createCategoryModelArray(data: any[]): CategoryModel[] {
    return data.map((item: KeyValueInterface<any>): CategoryModel => CategoryHelper.createCategoryModel(item));
  }

  public static createCategoryformoduleModelArray(data: any[]): CategoryformoduleModel[] {
    return data.map((item: KeyValueInterface<any>): CategoryformoduleModel => CategoryHelper.createCategoryformoduleModel(item));
  }

  public static createCategoryformoduleModel(data: KeyValueInterface<any> = {}): CategoryformoduleModel {
    /*console.log(data);*/
    return new CategoryformoduleModel({
      title: data.title,
      slug: data.slug,
      parent: data.parent,
      extension: data.extension,
      childs: data.childs,
      cid: data.cid
    });
  }

  public static cloneCategoryModel(model: CategoryModel): CategoryModel {
    return new CategoryModel({
      _id: model._id,
      title: model.title,
      slug: model.slug,
      parent: model.parent,
      extension: model.extension,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      cid: model.cid,
      description: model.description,
      __v: model.__v,
      childs: model.childs
    });
  }
}
