[![npm version](https://img.shields.io/npm/v/ng2-simple-page-scroll.svg?style=flat)](https://www.npmjs.com/package/ng2-simple-page-scroll)
[![Code Climate](https://codeclimate.com/github/bbottema/ng2-simple-page-scroll/badges/gpa.svg)](https://codeclimate.com/github/bbottema/ng2-simple-page-scroll)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/bbottema/ng2-simple-page-scroll.svg)](https://david-dm.org/bbottema/ng2-simple-page-scroll)
[![devDependency Status](https://david-dm.org/bbottema/ng2-simple-page-scroll/dev-status.svg)](https://david-dm.org/bbottema/ng2-simple-page-scroll#info=devDependencies)

# ng2-simple-page-scroll
Instant "Jump to element" functionality rewritten in a pure angular2 directive with no additional dependencies

## Features
- jump to the top edge of an element referenced in the href-attribute (`href="#mytarget`)
- works across routes (scrolls to target element as soon as the routing has finished)

## Setup
First you need to install the npm module:
```sh
npm install ng2-simple-page-scroll --save
```

Then import the directive and add it to the `directives` array of your component. In your template you may now add the `simplePageScroll` attribute to elements with an `href` attribute pointing towards an anchor on the same page (e.g. `#anchor`).
```js
import {SimplePageScroll} from 'ng2-simple-page-scroll';


@Component({
   ...
   template: `...
        <a simplePageScroll href="#myanchor">Go there</a>
   ...`,
    directives: [SimplePageScroll]
})
export class MyComponent  {
}
```

## Configuration
The class `SimplePageScrollConfig` offers static properties to be manipulated to configure the default behavior. Override the respective properties to change all page scroll-animation defaults.

### Configuration properties
- `defaultScrollOffset` (`?:number=0`) - Pixels to offset from the top of the element when scrolling to (positive value = scrolling will stop given pixels atop the target element)

### Example
```js
import {SimplePageScrollConfig} from 'ng2-simple-page-scroll';

export class AppComponent {
    constructor() {
        SimplePageScrollConfig.defaultScrollOffset = 50;
    }
}
```

## API
The property may be set on individual elements as well. They take precedence over the default settings specified in `SimplePageScrollConfig` class.

### SimplePageScroll properties
- `simplePageScroll` - Attribute to add scroll-animation behavior when the `click`-event happens to an existing element.
- `simplePageScrollOffset` (`?:number=0`) - Pixels to offset from the top of the element when scrolling to (positive value = scrolling will stop given pixels atop the target element)

### Example
Most basic example:
```html
 <a simplePageScroll href="#myanchor">Go there</a>
```

The following example will check whether the route _Home_ is currently loaded. If this is true, the jump will be performed. If a different route is loaded, a subscription for route changes will be made and the jump will be performed as soon as the new route is loaded.
```html
 <a simplePageScroll [routerLink]="['Home']" href="#myanchor">Go there</a>
```

Overriding offset property.
```html
 <a simplePageScroll [simplePageScrollOffset]="0" href="#theanchor">Visit</a>
```


## License

[MIT](LICENSE)
