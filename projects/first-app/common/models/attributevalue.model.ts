import { AttributevalueInterface } from '../interfaces/attributevalue.interface';

export class AttributevalueModel implements AttributevalueInterface {
    public attr_value_id: number;
    public attr_id: number;
    public product_id: number;
    public price_modification: number;
    public price: number;
    public image: string;
    public value: string;
    public title: string;
    public color: string;
    public ordering: number;
    public child_product_id: string;

    constructor(params: AttributevalueInterface = {} as AttributevalueInterface) {
        this.attr_value_id = params.attr_value_id;
        this.attr_id = params.attr_id;
        this.product_id = params.product_id;
        this.price_modification = params.price_modification;
        this.price = params.price;
        this.image = params.image;
        this.value = params.value;
        this.title = params.title;
        this.color = params.color;
        this.ordering = params.ordering;
        this.child_product_id = params.child_product_id;
    }
}
