class BladeHostElement extends HTMLElement {
    // property
    // .. showBreadCrumb
    // .. allowMultipleStacks

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <link rel="stylesheet" href="blade-webcomponent.css">
        <div id="blade-host-element" class="blade-host-element">
            <slot id="blade-stack-slot"></slot>
        </div>
        `;
    }
    connectedCallback() {
    }
    disconnectedCallback() {

    }
    attributeChangedCallback(attrName, oldVal, newVal) {
    }

    get stacks() {
        return this.shadowRoot.getElementById("blade-stack-slot").assignedNodes().filter(n => n.nodeName == "BLADE-STACK");
    }
}

class BladeStackElement extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <link rel="stylesheet" href="blade-webcomponent.css">
        <div id="blade-stack-element" class="blade-stack-element">
            <slot id="blade-slot"></slot>
        </div>
        `;
    }
    connectedCallback() {
    }
    disconnectedCallback() {

    }
    attributeChangedCallback(attrName, oldVal, newVal) {
    }

    get blades() {
        return this.shadowRoot.getElementById("blade-slot").assignedNodes().filter(n => n.nodeName == "BLADE-BLADE");
    }
}

class BladeBladeElement extends HTMLElement {
    // property
    // .. title
    // .. subTitle
    // .. icon
    // .. allowFullScreen
    // .. min-width

    // functions
    // .. close

    // event
    // .. closed (closes all later)

    static get observedAttributes() {
        return ['title', 'sub-title', 'icon'];
    }

    constructor() {
        super(); // always call super() first in the constructor.

        this._closedEvent = new CustomEvent("closed", {
            bubbles: true,
            cancelable: false,
        });

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <link rel="stylesheet" href="blade-webcomponent.css">
        <div class="blade-blade-element">
            <header>
                <div id="icon"></div>
                <h2 id="title"></h2>
                <small id="sub-title"></small>
                <button id="close">X</button>
            </header>
            <div class="blade-command-bar-element">
                <slot name="blade-buttons"></slot>
            </div>
            <div id="content">
            <slot></slot>
            </div>
        </div>
        `;
    }
    connectedCallback() {
        this.shadowRoot.getElementById('close').addEventListener('click', _ => this.close());

        let previous = this.previousSibling;

        while (previous != null && previous.nodeName != "BLADE-BLADE") {
            previous = previous.previousSibling;
        }

        if (previous != null) {
            previous.addEventListener("closed", () => this.close());
        }
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.renderAttributePassThrough(attrName, newVal);
    }


    get title() {
        return this.getAttribute("title");
    }
    set title(val) {
        this.setAttribute("title", val);
    }

    get subTitle() {
        return this.getAttribute("sub-title");
    }
    set subTitle(val) {
        this.setAttribute("sub-title", val);
    }

    get icon() {
        return this.getAttribute("icon");
    }
    set icon(val) {
        this.setAttribute("icon", val);
    }

    close() {
        this.dispatchEvent(this._closedEvent);
        this.remove();
    }

    renderAttributePassThrough(attrName, newVal) {
        const element = this.shadowRoot.getElementById(attrName);

        if (element) {
            element.innerHTML = newVal;
        }
    }
}

window.customElements.define('blade-host', BladeHostElement);
window.customElements.define('blade-stack', BladeStackElement);
window.customElements.define('blade-blade', BladeBladeElement);