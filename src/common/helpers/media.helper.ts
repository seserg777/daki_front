import { KeyValueInterface } from '../interfaces/key-value.interface';
import { MediaModel } from '../models/media.model';

export class MediaHelper {
    public static createModelArray(data: any[]): MediaModel[] {
        return data.map((item: KeyValueInterface<any>): MediaModel => MediaHelper.createModelFromServerData(item));
    }

    public static createModelFromServerData(parsed: KeyValueInterface<any> = {}): MediaModel {
        return new MediaModel({
            id: parsed.id,
            type: parsed.type,
            item_id: parsed.item_id,
            full_image: parsed.full_image,
            thumb_image: parsed.thumb_image,
            webp_full_image: parsed.webp_full_image,
            webp_thumb_image: parsed.webp_thumb_image,
            ordering: parsed.ordering
        });
    }
}