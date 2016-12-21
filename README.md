[![npm version](https://img.shields.io/npm/v/ng2-simple-page-scroll.svg?style=flat)](https://www.npmjs.com/package/ng2-simple-page-scroll)
[![Code Climate](https://codeclimate.com/github/bbottema/ng2-simple-page-scroll/badges/gpa.svg)](https://codeclimate.com/github/bbottema/ng2-simple-page-scroll)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/bbottema/ng2-simple-page-scroll.svg)](https://david-dm.org/bbottema/ng2-simple-page-scroll)
[![devDependency Status](https://david-dm.org/bbottema/ng2-simple-page-scroll/dev-status.svg)](https://david-dm.org/bbottema/ng2-simple-page-scroll#info=devDependencies)

# ng2-simple-page-scroll

Animated "scroll to element" functionality written in pure angular2 with no additional dependencies


## Features

- easy-to-use directive: scroll to the top edge of an element referenced in the href-attribute (`href="#mytarget`) just by adding `simplePageScroll` directive
- service usage: trigger instant scrolls from your component or when server responds
- works across routes (scrolls to target element as soon as the routing has finished)

## Table of contents

- [Setup](#setup)
- [Usage](#usage)
    - [Directive](#directive)
    - [Service](#service)
- [Configuration](#configuration)
- [Directive API](#directive-api)

## Setup

First you need to install the npm module:
```sh
npm install ng2-simple-page-scroll --save
```

Then add the `Ng2SimplePageScrollModule` to the imports array of your application module:

```typescript
import {Ng2SimplePageScrollModule} from 'ng2-simple-page-scroll';

@NgModule({
    imports: [
        /* Other imports here */
        Ng2SimplePageScrollModule.forRoot()
        ]
})
export class AppModule {
}
```
 
Finally you need to specify how your application should load the ng2-simple page-scroll library:

#### Angular2 modules

All the compiled JavaScript files use ES2015 module format, so they are ready for usage with [RollupJS](http://rollupjs.org/). However, you cannot use them with SystemJS.

`.metadata.json` files are generated for usage with [Angular2 AoT compiler](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html).

#### SystemJS

UMD bundles are available for SystemJS loading. Example:

```js
System.config({
    paths: {
        'npm:': 'node_modules/'
    },
    map: {
        app: 'app',

        '@angular/core'   : 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common' : 'npm:@angular/common/bundles/common.umd.js',
        // further angular bundles...

        'ng2-simple-page-scroll/ng2-simple-page-scroll': 'npm:ng2-simple-page-scroll/bundles/ng2-simple-page-scroll.umd.js',

        rxjs: 'npm:rxjs',
    },
    packages: {
        app : {defaultExtension: 'js', main: './main.js'},
        rxjs: {defaultExtension: 'js'}
    }
});
```

```typescript
import {Ng2SimplePageScrollModule} from 'ng2-simple-page-scroll/ng2-simple-page-scroll';

@NgModule({
    imports: [
        /* Other imports here */
        Ng2SimplePageScrollModule.forRoot()
        ]
})
export class AppModule {
}
```


## Usage 

### Directive

In your template you may add the `simplePageScroll` attribute to elements with an `href` attribute pointing towards an id on the same page (e.g. `#theId`).

```js

@Component({
   ...
   template: `...
        <a simplePageScroll href="#awesomePart">Take me to the awesomeness</a>
        <!-- Further content here -->
        <h2 id="awesomePart">This is where the awesome happens</h2>
   ...`,
})
export class MyComponent {
}
```

### Service

You may use the service for programmatic instant scrolls to HTML elements. Possible use cases are server responses or after content initialization.
 
Start by obtaining a reference to the `SimplePageScrollService` instance by adding it to your component's 
constructor. The `SimplePageScrollService` offers a simple `scrollToElement()` function that accepts an 
element #id or a reference to an `HTMLElement`.

```js
@Component({
    template: `
        <p>Main content</p>
        <!-- Further content here -->
        <h2 id="head2">Part in a container</h2>
        <div #container>
            <p>Container content</p>
            <h3 id="head3">Heading</h3>
        </div>`
})
export class MyComponent {

     constructor(private simplePageScrollService: SimplePageScrollService, @Inject(DOCUMENT) private document: Document) {
     }

     public goToHead2(): void {
         this.simplePageScrollService.scrollToElement("#head2", /* optional offset */);
         this.simplePageScrollService.scrollToElement(elementReference, /* optional offset */);
     };
 }
 ```

## Configuration

The class `SimplePageScrollConfig` offers static properties to be manipulated to 
configure the default behavior. Override the respective properties to change 
all page scroll-animation defaults.

| Configuration Option   | Type        | Default      | Description   |
| ---------------------- | ----------- | ------------ |-------------- |
| `defaultScrollOffset`  | number      | 0            | Pixels to offset from the top of the element when scrolling to (positive value = scrolling will stop given pixels atop the target element).

### Example

```js
import {SimplePageScrollConfig} from 'ng2-simple-page-scroll';

export class AppComponent {
    constructor() {
        SimplePageScrollConfig.defaultScrollOffset = 50;
    }
}
```

## Directive API

Additional attributes may be set on an DOM element using the `simplePageScroll` directive for customization.
They take precedence over the default settings specified in `SimplePageScrollConfig` class. Thereby it is 
possible to have all page scrolls have a default offset, but a specific one should have a different offset.

### PageScroll properties

| Attribute                 | Type        | Default      | Description   |
| ------------------------- | ----------- | ------------ |-------------- |
| `simplePageScroll`        |             |              | Attribute adding scroll behavior when the `click`-event happens on the element.
| `pageScrollOffset`        | number      | 0            | Pixels to offset from the top of the element when scrolling to (positive value = scrolling will stop given pixels atop the target element).

### PageScroll events

| Event                 | Type    | Description   |
| --------------------- | ------- | ------------- |
| `pageScrollFinish`    | boolean | Fired when the scroll-animation stops. Emits a boolean value which indicates whether the scroll animation finished successfully (`true`) or not (`false`). Possible reasons for false: target not found.

### Example

The following example will check whether the route _Home_ is currently loaded. If this is true, the scroll will be performed with the default 
offset. If a different route is loaded, a subscription for route changes will be made and the scroll will be performed as soon as the new 
route is loaded.

```html
 <a simplePageScroll [routerLink]="['Home']" href="#myanchor">Go there</a>
```

Overriding all possible properties. `doSmth()` is defined in the component

```html
 <a simplePageScroll [pageScrollOffset]="0" (pageScrollFinish)="doSmth($event)" href="#theanchor">Visit</a>
```

```js

    doSmth(scrollSuccesful: boolean): void {
        if (scrollSuccesful) {
            console.log('Yeah, we scrolled');
        } else {
            console.log('Ohoh, something prevented the scroll');
        }
    }
```