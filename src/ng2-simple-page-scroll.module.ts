import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {SimplePageScrollService} from './ng2-simple-page-scroll.service';
import {SimplePageScroll} from './ng2-simple-page-scroll.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [SimplePageScroll],
    exports: [SimplePageScroll]
})
export class Ng2SimplePageScrollModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: Ng2SimplePageScrollModule,
            providers: [
                {provide: SimplePageScrollService, useClass: SimplePageScrollService}
            ]
        };
    }
}