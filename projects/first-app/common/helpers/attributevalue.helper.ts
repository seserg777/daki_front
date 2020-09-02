import { KeyValueInterface } from '../interfaces/key-value.interface';
import { AttributevalueModel } from '../models/attributevalue.model';

export class AttributevalueHelper {
    public static createAttributevalueModelArray(data: any[]): AttributevalueModel[] {
        return data.map((item: KeyValueInterface<any>): AttributevalueModel => AttributevalueHelper.createAttributevalueModel(item));
    }

    public static createAttributevalueModel(data: KeyValueInterface<any> = {}): AttributevalueModel {
        return new AttributevalueModel({
            attr_value_id: data.attr_value_id,
            attr_id: data.attr_id,
            product_id: data.product_id,
            price_modification: data.price_modification,
            price: data.price,
            image: data.image,
            value: data.value,
            title: data.title,
            color: data.color,
            ordering: data.ordering,
            child_product_id: data.child_product_id
        });
    }
}
