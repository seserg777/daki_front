import { AttributevalueInterface } from './attributevalue.interface';
import { AttributevalueModel } from '../models/attributevalue.model';
import { MediaInterface } from './media.interface';

export interface ProductInterface {
    product_id: number;
    title: string;
    short_description: string;
    description: string;
    price: number;
    price_calculated: number;
    media: MediaInterface[];
    manufacturer_id: number;
    manufacturer_code: string;
    manufacturer_title: string;
    product_ean: string;
    category_id: number;
    category_title: string;
    product_quantity: number;
    state: number;
    slug: string;
    meta_title: string;
    meta_description: string;
    meta_keyword: string;
    wishlist: boolean;
    child: ProductInterface[];
    attributes: AttributevalueInterface[];
    attributesSorted: AttributevalueModel[][];
}
