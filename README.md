# RazorBlades - Web Component

WebComponents to render a Blade Layout (famous due to the Azure Portal) using lightweight modern JavaScript, DOM and HTML.

[![npm](https://img.shields.io/npm/v/@razorblades/blades-webcomponent.svg)](https://www.npmjs.com/package/@razorblades/blades-webcomponent)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@razorblades/blades-webcomponent)

## Walk through & features

**Javscript & CSS**

````html
<script type="module" src="blades-webcomponent.js"></script>
````

RazorBlades Web Component are distributed using a JavaScript module. Feel free to [download](src/blades-webcomponent.js), minimize, bundle and host it on your own. CSS is currently embedded in the WebComponent JavaScript.

**Hosted in a parent element**

````html
<blade-host>
</blade-host>
````

The host consume all space from its parent using `position:absolute;left:0;top:0;width:100%;height:100%`. You have to box it adequately.

**Blade Stacks are aligned in stacks**

*Note: multiple stacks are not yet implemented*
````html
<blade-host>
    <blade-stack id="stack1">
    </blade-stack>
</blade-host>
````

The stacks overflow horizontally. Be prepared for a scrollbar.

The `blade-host` DOM Element has a property `stacks` which returns an array of the displayed stacks.

**Blades are added to stacks and have content**

````html
<blade-host>
    <blade-stack id="stack1">
        <blade-blade id="blade1" title="Settings" sub-title="Overview" icon="🎚">
            Hello World
        </blade-blade>
    </blade-stack>
</blade-host>
````

The title and sub-title attributes are **mandatory**.

The `blade-stack` DOM Element has a property `blades` which returns an array of the displayed blades.

**Adding buttons into web component slots**

````html
<blade-host>
    <blade-stack id="stack1">
        <blade-blade id="blade1" title="Settings" sub-title="Overview" icon="🎚">
            <button slot="blade-buttons" onclick="document.getElementById('blade1').setAttribute('title', 'blub');">➕ Change Title</button>
            Hello World
        </blade-blade
    </blade-stack>
</blade-host>
````

Buttons in the body can be added to a `slot` within the blade's button row. They are formatted by the web component but behave otherwise like any button.

## Specification, Testing & Other

1. RazorBlades are tested and developed using Firefox.
   - Firefox (Evergreen at moment of release)
   - Chrome (Evergreen at moment of release)
   - IE11 support may be achieved using polyfills. We do not test or support this.
1. Technology
   - Uses only HTML/DOM/JS standards
     - [Custom Elements](https://caniuse.com/#feat=custom-elementsv1)
     - [Shadow DOM](https://caniuse.com/#feat=shadowdomv1)
     - [ECMAScript 2015 (ES6)](https://caniuse.com/#feat=es6)
     - [Flexbox](https://caniuse.com/#feat=flexbox)

## License

MIT Licensed