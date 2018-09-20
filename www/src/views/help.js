const html = require('choo/html')

function helpView (state, emit) {
    return html`
    <body>
        <h1>HELP</h1>
    </body>
    `
}

module.exports = helpView
