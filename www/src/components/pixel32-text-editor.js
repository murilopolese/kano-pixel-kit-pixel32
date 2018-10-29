class TextEditorComponent extends BaseElement {
    constructor() {
        super()
        this.code = '# Write MicroPython here!\n\n\n\n\n\n\n\n\n'
    }
    template() {
        return `
<link rel="stylesheet" href="node_modules/codemirror/lib/codemirror.css">
<link rel="stylesheet" href="node_modules/codemirror/theme/monokai.css">
<style>
:host {
    display: block;
    width: 100%;
    height: 100%;
}
#editor {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
}
.CodeMirror {
    height: 100%;
    font-size: 18px;
}
.CodeMirror pre {
    padding-left: 13px;
}
.CodeMirror-linenumber {
    border-right: solid #666666;
    background: #333333;
}
</style>
<div id="editor"></div>
`
    }
    connectedCallback() {
        this.render()
        this.autoSaveTimeout = 0
        this.editor = CodeMirror(this.shadowRoot.querySelector('#editor'), {
            lineNumbers: true,
            mode: 'python',
            value: this.code,
            theme: 'monokai'
        })
        this.editor.on('change', this.onChange.bind(this))
        setTimeout(() => {
            this.editor.refresh()
        }, 100)
    }
    getValue() {
        return this.editor.getValue()
    }
    setValue(value) {
        return this.editor.setValue(value)
    }
    onChange() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: this.getValue()
        }))
    }
}
customElements.define('pixel32-text-editor', TextEditorComponent)
