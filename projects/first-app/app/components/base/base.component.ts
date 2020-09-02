import { Component } from '@angular/core';

@Component({
    selector: 'app-base',
    template: `<div id="wrapper">
        <app-header></app-header>
        <div class="content">
            <div class="container">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>`
})

export class BaseComponent {}
