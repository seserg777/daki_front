export interface CategoryformoduleInterface {
    title: string;
    slug: string;
    parent: string;
    extension: string;
    cid: string;
    childs: CategoryformoduleInterface[];
}
