import {Directive, Input, Output, EventEmitter, AfterViewChecked} from '@angular/core';
import {Router, NavigationEnd, NavigationError, NavigationCancel} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {SimplePageScrollService} from './ng2-simple-page-scroll.service';

@Directive({
    selector: '[simplePageScroll]',
    host: { // tslint:disable-line:use-host-property-decorator
        '(click)': 'handleClick($event)',
    }
})
export class SimplePageScroll implements AfterViewChecked {

    @Input()
    private routerLink: any;

    @Input()
    private href: string;

    @Input()
    private pageScrollOffset: number = null;

    @Output()
    public pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

    private shouldScroll: boolean = false;

    constructor(private router: Router, private simplePageScrollService: SimplePageScrollService) {
    }

    public handleClick(clickEvent: Event): boolean { // tslint:disable-line:no-unused-variable
        if (this.routerLink && this.router !== null && this.router !== undefined) {
            // wait for router to finish navigating
            // Note: the change event is also emitted when navigating to the current route again
            let subscription: Subscription = <Subscription>this.router.events.subscribe((routerEvent) => {
                if (routerEvent instanceof NavigationEnd) {
                    subscription.unsubscribe();
                    this.shouldScroll = true;
                } else if (routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
                    subscription.unsubscribe();
                    this.pageScrollFinish.emit(false);
                }
            });
        } else {
            // no router action; scroll immediately
            this.scrollAndEmitEvent();
        }
        return false; // to preventDefault()
    }

    private scrollAndEmitEvent() {
        this.simplePageScrollService.scrollToElement(this.href, this.pageScrollOffset);
        this.shouldScroll = false;
        this.pageScrollFinish.emit(true);
    }

    ngAfterViewChecked(): void {
        if (this.shouldScroll) {
            this.scrollAndEmitEvent();
        }
    }
}