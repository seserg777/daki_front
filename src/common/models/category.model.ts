import { CategoryInterface } from '../interfaces/category.interface';
import { KeyValueInterface } from '../interfaces/key-value.interface';

export class CategoryModel implements CategoryInterface {
    public _id: string;
    public title: string;
    public slug: string;
    public parent: string;
    public extension: string;
    public createdAt: string;
    public updatedAt: string;
    public cid: string;
    public description: string;
    public  __v: string;
    public childs: CategoryModel[];

    constructor(params: CategoryInterface = {} as CategoryInterface) {
        this._id = params._id;
        this.title = params.title;
        this.slug = params.slug;
        this.parent = params.parent;
        this.extension = params.extension;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.cid = params.cid;
        this.description = params.description;
        this.__v = params.__v;
        this.childs =
        (
            !!params.childs && params.childs instanceof Array
            ? params.childs.map((item: KeyValueInterface<any>): CategoryModel => this.createCategoryModel(item))
            : []
        )
    }

    public createCategoryModel(parsed: KeyValueInterface<any>): CategoryModel {
        return new CategoryModel({
            _id: parsed._id,
            title: parsed.title,
            slug: parsed.slug,
            parent: parsed.parent,
            extension: parsed.extension,
            createdAt: parsed.createdAt,
            updatedAt: parsed.updatedAt,
            cid: parsed.cid,
            description: parsed.description,
            __v: parsed.__v,
            childs: parsed.childs
        });
    }
}
