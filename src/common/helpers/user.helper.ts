import { KeyValueInterface } from '../interfaces/key-value.interface';
import { UserModel } from '../models/user.model';

export class UserHelper {
  public static createUserModelFromServerData(data: KeyValueInterface<any>): UserModel {
    return new UserModel({
        email: data.email,
        id: data.id,
        name: data.name,
        exp: data.exp,
        iat: data.iat,
        groups: data.groups
    });
  }

  public static createUserModel(data: KeyValueInterface<any> = {}): UserModel {
    return new UserModel({
        email: data.email,
        id: data.id,
        name: data.name,
        exp: data.exp,
        iat: data.iat,
        groups: data.groups
    });
  }

  public static createUserModelArray(data: any[]): UserModel[] {
    return data.map((item: KeyValueInterface<any>): UserModel => UserHelper.createUserModel(item));
  }

  public static cloneUserModel(model: UserModel): UserModel {
    return new UserModel({
        email: model.email,
        id: model.id,
        name: model.name,
        exp: model.exp,
        iat: model.iat,
        groups: model.groups
    });
  }
}
