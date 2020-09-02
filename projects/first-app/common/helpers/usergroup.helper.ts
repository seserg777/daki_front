import { KeyValueInterface } from '../interfaces/key-value.interface';
import { UsergroupModel } from '../models/usergroup.model';

export class UsergroupHelper {
  public static createUsergroupModelFromServerData(data: KeyValueInterface<any>): UsergroupModel {
    return new UsergroupModel({
        usergroup_id: data.usergroup_id,
        title: data.title,
        state: data.state
    });
  }

  public static createUsergroupModel(data: KeyValueInterface<any> = {}): UsergroupModel {
    return new UsergroupModel({
        usergroup_id: data.usergroup_id,
        title: data.title,
        state: data.state
    });
  }

  public static createUsergroupModelArray(data: any[]): UsergroupModel[] {
    return data.map((item: KeyValueInterface<any>): UsergroupModel => UsergroupHelper.createUsergroupModel(item));
  }

  public static cloneUserModel(model: UsergroupModel): UsergroupModel {
    return new UsergroupModel({
        usergroup_id: model.usergroup_id,
        title: model.title,
        state: model.state
    });
  }
}
