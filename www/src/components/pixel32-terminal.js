class TerminalComponent extends BaseElement {
    template() {
        return `
<style>
:host {
    display: flex;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
}
/**
 *  Default styles for xterm.js
 */
.xterm {
    font-family: courier-new, courier, monospace;
    font-feature-settings: "liga" 0;
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
    outline: none;
}

.xterm .xterm-helpers {
    position: absolute;
    top: 0;
    /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
    z-index: 10;
}

.xterm .xterm-helper-textarea {
    /*
     * HACK: to fix IE's blinking cursor
     * Move textarea out of the screen to the far left, so that the cursor is not visible.
     */
    position: absolute;
    opacity: 0;
    left: -9999em;
    top: 0;
    width: 0;
    height: 0;
    z-index: -10;
    /** Prevent wrapping so the IME appears against the textarea at the correct position */
    white-space: nowrap;
    overflow: hidden;
    resize: none;
}

.xterm .composition-view {
    /* TODO: Composition position got messed up somewhere */
    background: #000;
    color: #FFF;
    display: none;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
}

.xterm .composition-view.active {
    display: block;
}

.xterm .xterm-viewport {
    /* On OS X this is required in order for the scroll bar to appear fully opaque */
    background-color: #000;
    overflow-y: scroll;
    cursor: default;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
}

.xterm .xterm-screen {
    position: relative;
}

.xterm .xterm-screen canvas {
    position: absolute;
    left: 0;
    top: 0;
}

.xterm .xterm-scroll-area {
    visibility: hidden;
}

.xterm-char-measure-element {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: -9999em;
    line-height: normal;
}

.xterm {
    cursor: text;
}

.xterm.enable-mouse-events {
    /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
    cursor: default;
}

.xterm.xterm-cursor-pointer {
    cursor: pointer;
}

.xterm.xterm-cursor-crosshair {
    /* Column selection mode */
    cursor: crosshair;
}

.xterm .xterm-accessibility,
.xterm .xterm-message {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    color: transparent;
}

.xterm .live-region {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}
#terminal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
<div id="terminal"></div>
        `
    }
    connectedCallback() {
        this.render()
        this.term = new Terminal({
            allowTransparency: true,
            letterSpacing: 2,
            lineHeight: 1.2,
            fontSize: 22,
            cols: 45,
            rows: 18,
            theme: {
                background: 'transparent',
                foreground: '#ffffff'
            }
        })
        this.term.open(this.shadowRoot.querySelector('#terminal'))
        this.term.setColor = this.setColor.bind(this)
        this.term.on('key', this.onKey.bind(this))
        window.dispatchEvent(new Event('resize'))
    }
    onKey(key, ev) {
        this.dispatchEvent(new CustomEvent('key', { detail: { key, ev } }))
    }
    write(data) {
        this.term.write(data)
    }
    setColor(r, g, b) {
        this.term.write('\x1b[38;2;'+r+';'+g+';'+b+'m')
    }

}
customElements.define('pixel32-terminal', TerminalComponent)
