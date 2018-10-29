class ToolbarComponent extends BaseElement {
    template() {
        return `
<style>
    :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 10px;
        height: calc(100% - 20px);
    }
    ::slotted(*) {
        margin-bottom: 10px;
    }
</style>
<slot></slot>
        `
    }
}
customElements.define('pixel32-toolbar', ToolbarComponent)
