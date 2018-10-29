class SmallScreenComponent extends BaseElement {
    template() {
        return `
<style>
:host {
    display: none;
    color: #FFFFFF;
}
@media (max-width: 800px) {
    :host {

        position: fixed;
        left: 0;
        top: 0;
        width: calc(100vw - 20px);
        height: calc(100vh - 20px);
        padding: 10px;
        background: #333;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        color: #fff;
        font-family: monospace;
        text-align: center;
    }
}
</style>
Oh noes... Seems like your screen is too small to display this interface... <br/> <br/>
Try changing your screen orientation or resizing your window!
        `
    }
}
customElements.define('pixel32-small-screen', SmallScreenComponent)
