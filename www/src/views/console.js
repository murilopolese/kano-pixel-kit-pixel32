const html = require('choo/html')

function consoleView (state, emit) {
    function onKeyDown(e) {
        e.preventDefault()
        if(e.altKey || e.ctrlKey || e.metaKey || e.repeat || state.console.readOnly) {
            return false
        }
        let lines = state.console.out.split('\n')
        let currentLine = lines.slice(-1)[0]
        switch(e.key.toLowerCase()) {
            case 'enter':
                emit('evaluate', currentLine.substr(2))
                break
            case 'backspace':
                if(currentLine != '> ') {
                    emit('backspace')
                }
                break
            case 'escape':
            case 'shift':
            case 'tab':
            case 'arrowup':
            case 'arrowdown':
            case 'arrowleft':
            case 'arrowright':
                break
            default:
                emit('print', e.key)
                break
        }
        e.target.scrollTo(0, e.target.scrollHeight)
        return false
    }
    return html`
    <textarea id="console-input"
        onkeydown=${onKeyDown}
        ${state.console.readOnly?'readonly':''}
        class="textarea">${state.console.out}</textarea>
    `
}

module.exports = consoleView
