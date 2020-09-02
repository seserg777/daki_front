import {Injectable} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })

export class SEOService {
    constructor(private title: Title, private meta: Meta) { }

    public updateTitle(title: string): void {
        this.title.setTitle(title);
    }

    public updateOgUrl(url: string): void {
        this.meta.updateTag({ name: 'og:url', content: url });
    }

    public updateDescription(desc: string): void {
        this.meta.updateTag({ name: 'description', content: desc });
    }
}
