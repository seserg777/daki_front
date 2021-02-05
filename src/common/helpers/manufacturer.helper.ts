import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ManufacturerModel } from '../models/manufacturer.model';

export class ManufacturerHelper {
  public static createManufacturerModelFromServerData(data: KeyValueInterface<any>): ManufacturerModel {
    return new ManufacturerModel({
        manufacturer_id: data.manufacturer_id,
        title: data.title,
        short_description: data.body,
        description: data.createdAt
    });
  }

  public static createManufacturerModel(data: KeyValueInterface<any> = {}): ManufacturerModel {
    return new ManufacturerModel({
        manufacturer_id: data.manufacturer_id,
        title: data.title,
        short_description: data.short_description,
        description: data.description
    });
  }

  public static createManufacturerModelArray(data: any[]): ManufacturerModel[] {
    return data.map((item: KeyValueInterface<any>): ManufacturerModel => ManufacturerHelper.createManufacturerModel(item));
  }

  public static cloneManufacturerModel(model: ManufacturerModel): ManufacturerModel {
    return new ManufacturerModel({
        manufacturer_id: model.manufacturer_id,
      title: model.title,
      short_description: model.short_description,
      description: model.description
    });
  }
}
