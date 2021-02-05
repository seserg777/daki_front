export interface CategoryInterface {
    _id: string;
    title: string;
    slug: string;
    parent: string;
    extension: string;
    createdAt: string;
    updatedAt: string;
    cid: string;
    description: string;
    __v: string;
    childs: CategoryInterface[];
}
