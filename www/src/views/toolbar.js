const html = require('choo/html')
function toolbarView (state, emit) {
    return html`
    <div id="toolbar">
        <div class="menu">
            <div class="item code-editor" active>
                <button>📝</button>
                <div class="label">CODE EDITOR</div>
            </div>
            <div class="item sprite-editor">
                <button data-name="sprite-editor">👻</button>
                <div class="label">SPRITE EDITOR</div>
            </div>
        </div>
    </div>
    `
}

module.exports = toolbarView
