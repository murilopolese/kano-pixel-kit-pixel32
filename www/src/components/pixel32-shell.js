class ShellComponent extends BaseElement {
    static get observedAttributes() {
        return ['selected']
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render()
        this.toggleSelected()
    }
    connectedCallback() {
        this.render()
        this.toggleSelected()
    }
    toggleSelected() {
        let currentSelected = this.querySelector('[slot="pages"][selected]')
        if (currentSelected) {
            currentSelected.removeAttribute('selected')
        }
        if (this.get('selected')) {
            let nextSelected = this.querySelector(`#${this.get('selected')}`)
            nextSelected.setAttribute('selected', true)
        }
    }
    template() {
        return `
<style>
    :host {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 100vw;
        min-height: 100vh;
        color: #DDDDDD;
        background: #666666;
    }
    :host([fullheight]) #wrapper {
        height: 100vh;
        overflow-y: scroll;
    }
    #wrapper {
        width: 800px;
        height: 600px;
        background: #272822;
        overflow: hidden;
    }
    ::slotted([slot="pages"]:not([selected])) {
        display: none;
    }
    ::slotted([slot="pages"][selected]) {
        display: flex;
    }
    ::slotted([slot="pages"]) {
        width: 100%;
        height: 100%;
    }
</style>
<div id="wrapper">
    <slot name="pages"><slot>
</div>
        `
    }
}
customElements.define('pixel32-shell', ShellComponent)
