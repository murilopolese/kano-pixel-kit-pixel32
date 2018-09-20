const html = require('choo/html')

function codeEditorView (state, emit) {
    function onDragOver (e) {
        e.stopPropagation()
        e.preventDefault()
        emit('dragging', true)
    }
    function onDragLeave (e) {
        e.stopPropagation()
        e.preventDefault()
        emit('dragging', false)
    }
    function onDrop (e) {
        e.stopPropagation()
        e.preventDefault()
        if (!e.dataTransfer || !e.dataTransfer.files || !e.dataTransfer.files.length) {
            return;
        }
        emit('dragdrop', e.dataTransfer.files[0])
    }
    function onInput(e) {
        emit('input', e)
    }
    function onScroll(e) {
        emit('scroll-editor', e)
    }
    function onKeyDown(e) {
        let tabCode = 9;
        switch(e.keyCode) {
            case tabCode:
            e.preventDefault();
            emit('tab', e)
            break;
        }
    }
    return html`
    <div id="content-box" class="textarea">
        <textarea id="textarea-input"
            wrap="soft"
            spellcheck="false"
            ondragover=${onDragOver}
            ondragleave=${onDragLeave}
            ondrop=${onDrop}
            oninput=${onInput}
            onscroll=${onScroll}
            onkeydown=${onKeyDown}>${state.codeeditor.code}</textarea>
            ${state.codeeditor.highlighted}
    </div>
    `
}

module.exports = codeEditorView
