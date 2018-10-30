class SmallScreenComponent extends BaseElement {
    static get observedAttributes() {
        return ['url']
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render()
    }
    template() {
        return `
<style>
:host {
    display: none;
    color: #FFFFFF;
}
@media (max-width: 800px), (max-height: 600px) {
    :host {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
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
#message {
    padding: 40px;
}
</style>
<div id="message">
Oh noes... Seems like your browser window is too small to display this interface... <br/> <br/>
Try changing your screen orientation or resizing your window.
${this.urlMessage()}
</div>
        `
    }
    urlMessage() {
        if (this.get('url')) {
            return `
            <br><br>
            Or try opening ${this.get('url')} on another (larger) browser.
            `
        }
    }
}
customElements.define('pixel32-small-screen', SmallScreenComponent)
