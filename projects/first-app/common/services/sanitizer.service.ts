import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })

export class SanitizerService {
    constructor(private sanitizer: DomSanitizer) { }

    public sanitize(html: string): string {
        return this.sanitizer.bypassSecurityTrustHtml(html) as string;
    }
}
