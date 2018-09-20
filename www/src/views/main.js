const html = require('choo/html')
const consoleView = require('./console')
const toolbarView = require('./toolbar')
const codeEditorView = require('./codeeditor')

function mainView (state, emit) {
    function onKeyDown(e) {
        switch(e.key.toLowerCase()) {
            case 'escape':
                emit('switch-views')
                break
        }
    }
    return html`
    <body onkeydown=${onKeyDown}>
        <div id="container">
            <div id="console" ${state.router.active==='console'?'active':''}>
                ${consoleView(state, emit)}
            </div>
            <div id="editors" ${state.router.active==='editors'?'active':''}>
                ${toolbarView(state, emit)}
                ${codeEditorView(state, emit)}
            </div>
        </div>
    </body>
    `
}

module.exports = mainView
