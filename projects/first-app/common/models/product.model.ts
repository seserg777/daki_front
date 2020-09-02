import { ProductInterface } from '../interfaces/product.interface';
import { AttributevalueInterface } from '../interfaces/attributevalue.interface';
import { AttributevalueModel } from './attributevalue.model';
import { MediaModel } from './media.model';

export class ProductModel implements ProductInterface {
    public product_id: number;
    public title: string;
    public short_description: string;
    public description: string;
    public price: number;
    public price_calculated: number;
    public media: MediaModel[];
    public manufacturer_id: number;
    public manufacturer_code: string;
    public manufacturer_title: string;
    public product_ean: string;
    public category_id: number;
    public category_title: string;
    public product_quantity: number;
    public state: number;
    public slug: string;
    public meta_title: string;
    public meta_description: string;
    public meta_keyword: string;
    public wishlist: boolean = false;
    public child: ProductModel[] = [];
    public attributes: AttributevalueInterface[] = [];
    public attributesSorted: AttributevalueModel[][] = [];

    constructor(params: ProductInterface = {} as ProductInterface) {
        this.product_id = params.product_id;
        this.title = params.title;
        this.short_description = params.short_description;
        this.description = params.description;
        this.price = params.price;
        this.price_calculated = params.price_calculated;
        this.media = params.media;
        this.manufacturer_id = params.manufacturer_id;
        this.manufacturer_code = params.manufacturer_code;
        this.manufacturer_title = params.manufacturer_title;
        this.product_ean = params.product_ean;
        this.category_id = params.category_id;
        this.category_title = params.category_title;
        this.product_quantity = params.product_quantity;
        this.state = params.state;
        this.slug = params.slug;
        this.meta_title = params.meta_title;
        this.meta_description = params.meta_description;
        this.meta_keyword = params.meta_keyword;
        this.wishlist = params.wishlist ? params.wishlist : false;
        this.child = params.child;
        this.attributes = params.attributes;
        this.attributesSorted = params.attributesSorted;
    }
}
