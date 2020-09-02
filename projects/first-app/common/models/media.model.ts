import { MediaInterface } from '../interfaces/media.interface';

export class MediaModel implements MediaInterface {
    public id: number;
    public type: string;
    public item_id: number;
    public full_image: string;
    public thumb_image: string;
    public webp_full_image: string;
    public webp_thumb_image: string;
    public ordering: number;

    constructor(params: MediaInterface = {} as MediaInterface) {
        this.id = params.id;
        this.type = params.type;
        this.item_id = params.item_id;
        this.full_image = params.full_image;
        this.thumb_image = params.thumb_image;
        this.webp_full_image = params.webp_full_image;
        this.webp_thumb_image = params.webp_thumb_image;
        this.ordering = params.ordering;
    }
}
