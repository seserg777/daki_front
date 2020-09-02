import { AttributevalueModel } from '../models/attributevalue.model';
import { MediaModel } from '../models/media.model';

export interface CartproductInterface {
    product_id: number;
    title: string;
    price: number;
    quantity: number;
    media: MediaModel[];
    attrSelected: AttributevalueModel[];
}
