class ButtonComponent extends BaseElement {
    template() {
        return `
<style>
    :host {
        width: 50px;
        height: 50px;
        background: #666666;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    :host([disabled]) {
        pointer-events:none;
        cursor: not-allowed;
        opacity: 0.5;
    }
    :host([highlighted]),
    :host(:hover) {
        background: rgba(255, 255, 255, 0.5);
    }
    ::slotted(a) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
</style>
<slot></slot>
        `
    }
}
customElements.define('pixel32-button', ButtonComponent)
