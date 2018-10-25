class BaseElement extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this.render()
    }
    render() {
        try {
            this.unbindEvents()
        } catch(e) {}
        this.shadowRoot.innerHTML = this.template()
        this.bindEvents()
    }
    template() {
        return ''
    }
    unbindEvents() {}
    bindEvents() {}
    get(attr) {
        if(this.hasAttribute(attr)) {
            return this.getAttribute(attr)
        } else {
            return ''
        }
    }
}
