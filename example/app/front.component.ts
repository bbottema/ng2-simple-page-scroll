import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {SimplePageScroll} from 'ng2-simple-page-scroll';

@Component({
    templateUrl: './app/front.component.html',
    directives: [ROUTER_DIRECTIVES, SimplePageScroll]
})
export class FrontComponent {
}
