import { AttributeInterface } from '../interfaces/Attribute.interface';

export class AttributeModel implements AttributeInterface {
    public attr_id: number;
    public type: number;
    public title: string;
    public show_title: boolean;
    public image: string;
    public value: string;

    constructor(params: AttributeInterface = {} as AttributeInterface) {
        this.attr_id = params.attr_id;
        this.type = params.type;
        this.title = params.title;
        this.show_title = params.show_title;
        this.image = params.image;
        this.value = params.value;
    }
}
