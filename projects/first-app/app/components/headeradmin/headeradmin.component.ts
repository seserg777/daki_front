import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { faSignOutAlt, faShoppingCart, faNewspaper, faFolderOpen, faUserAlt, faUserShield, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-headeradmin',
    styleUrls: ['headeradmin.component.css'],
    templateUrl: 'headeradmin.component.html'
})
export class HeaderadminComponent {
    public faSignOutAlt = faSignOutAlt;
    public faShoppingCart = faShoppingCart;
    public faNewspaper = faNewspaper;
    public faFolderOpen = faFolderOpen;
    public faUserAlt = faUserAlt;
    public faUserShield = faUserShield;
    public faExternalLinkAlt = faExternalLinkAlt;

    constructor(private el: ElementRef, private auth: AuthenticationService) { }

    public logout(): void {
        this.auth.logout();
    }

    public dropdown(event: HTMLInputEvent): void {
        this.hideDropdowns();
        const parent: HTMLElement | null = event.target.parentElement;
        if (!!parent) {
            parent.classList.toggle('show');
            const dropdown: HTMLElement | null = parent.querySelector('.dropdown-menu');
            if (!!dropdown) {
                dropdown.classList.toggle('show');
            }
        }
    }

    public hideDropdowns(): void {
        const parents = this.el.nativeElement.querySelectorAll('.parent, .dropdown-menu');
        parents.forEach((parent: HTMLElement) => {
            parent.classList.remove('show');
        });
    }

    @HostListener('document:click', ['$event'])
    public clickOut(event: HTMLInputEvent): void {
        if (!this.el.nativeElement.contains(event.target)) {
            this.hideDropdowns();
        }

        if (event.target.tagName.toLowerCase() === 'a') {
            this.hideDropdowns();
        }
    }
}
