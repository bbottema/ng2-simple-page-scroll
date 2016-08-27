import { Directive, ElementRef, Input, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SimplePageScrollConfig } from './ng2-simple-page-scroll-config';

@Directive({
    selector: '[simplePageScroll]'
})
export class SimplePageScroll {

    @Input()
    public routerLink:any;

    @Input()
    public href:string;

    @Input()
    public simplePageScrollOffset:number = null;

    private document:Document;
    private body:HTMLBodyElement;

    constructor(private el:ElementRef, private router:Router) {
        this.document = el.nativeElement.ownerDocument;
        this.body = el.nativeElement.ownerDocument.body;
    }

    @HostListener('click', ['$event'])
    private handleClick(event:Event):boolean {
        if (this.routerLink) {
            // We need to navigate there first.
            // Navigation is handled by the routerLink directive,
            // so we only need to listen for route change.
            // Note: the change event is also emitted when navigating to the current route again.
            let subscription:Subscription = <Subscription>this.router.events.subscribe(() => {
                subscription.unsubscribe();
                this.scrollView(this.href);
            });
        } else {
            this.scrollView(this.href);
        }
        return false; // to preventDefault()
    }

    private scrollView(anchor:string):void {
        let anchorTarget:HTMLElement = this.document.getElementById(anchor.substr(1));
        if (anchorTarget !== null) {
            setScrollTop(this.body);
            setScrollTop(this.document.documentElement);
            setScrollTop(this.document.body.parentNode);
        }
        
        function setScrollTop(container:any) {
            if (container && container.scrollTop) {
                container.scrollTop =
                    anchorTarget.offsetTop -
                    anchorTarget.scrollTop +
                    anchorTarget.clientTop +
                    SimplePageScrollConfig.defaultScrollOffset;
            }
        }
    }
}
