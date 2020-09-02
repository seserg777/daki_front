import { CategoryformoduleInterface } from '../interfaces/categoryformodule.interface';
import { KeyValueInterface } from '../interfaces/key-value.interface';

export class CategoryformoduleModel implements CategoryformoduleInterface {
    public title: string;
    public slug: string;
    public parent: string;
    public extension: string;
    public cid: string;
    public childs: CategoryformoduleModel[];

    constructor(params: CategoryformoduleInterface = {} as CategoryformoduleInterface) {
        this.title = params.title;
        this.slug = params.slug;
        this.parent = params.parent;
        this.extension = params.extension;
        this.cid = params.cid;
        this.childs =
        (
            !!params.childs && params.childs instanceof Array
            ? params.childs.map((item: KeyValueInterface<any>): CategoryformoduleModel => this.createCategoryModel(item))
            : []
        )
    }

    public createCategoryModel(parsed: KeyValueInterface<any>): CategoryformoduleModel {
        return new CategoryformoduleModel({
            title: parsed.title,
            slug: parsed.slug,
            parent: parsed.parent,
            extension: parsed.extension,
            cid: parsed.cid,
            childs: parsed.childs
        });
    }
}
