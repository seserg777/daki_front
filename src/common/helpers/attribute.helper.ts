import { KeyValueInterface } from '../interfaces/key-value.interface';
import { AttributeModel } from '../models/attribute.model';

export class AttributeHelper {
    public static createAttributeModelArray(data: any[]): AttributeModel[] {
        return data.map((item: KeyValueInterface<any>): AttributeModel => AttributeHelper.createAttributeModel(item));
    }

    public static createAttributeModel(data: KeyValueInterface<any> = {}): AttributeModel {
        return new AttributeModel({
            attr_id: data.attr_id,
            type: data.type,
            title: data.title,
            show_title: data.show_title,
            image: data.image,
            value: data.value
        });
    }

    public static createAttributeModelFromServerData(data: KeyValueInterface<any>): AttributeModel {
        return new AttributeModel({
            attr_id: data.attr_id,
            type: data.type,
            title: data.title,
            show_title: data.show_title,
            image: data.image,
            value: data.value
        });
    }
}
