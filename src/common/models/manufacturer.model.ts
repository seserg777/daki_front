import { ManufacturerInterface } from '../interfaces/manufacturer.interface';

export class ManufacturerModel implements ManufacturerInterface {
    public manufacturer_id: number;
    public title: string;
    public short_description: string;
    public description: string;

    constructor(params: ManufacturerInterface = {} as ManufacturerInterface) {
        this.manufacturer_id = params.manufacturer_id;
        this.title = params.title;
        this.short_description = params.short_description;
        this.description = params.description;
    }
}
