import { CartproductInterface } from '../interfaces/cartproduct.interface';
import { AttributevalueModel } from './attributevalue.model';
import { MediaModel } from './media.model';

export class CartproductModel implements CartproductInterface {
    public product_id: number;
    public title: string;
    public price: number;
    public quantity: number;
    public media: MediaModel[];
    public attrSelected: AttributevalueModel[];

    constructor(params: CartproductInterface = {} as CartproductInterface) {
        this.product_id = params.product_id;
        this.title = params.title;
        this.price = params.price;
        this.quantity = params.quantity;
        this.media = params.media;
        this.attrSelected = params.attrSelected;
    }
}
