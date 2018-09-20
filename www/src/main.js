const choo = require('choo')
const html = require('choo/html')
// const devtools = require('choo-devtools')

const mainView = require('./views/main')
const helpView = require('./views/help')

const routerStore = require('./stores/router')
const connectionStore = require('./stores/connection')
const consoleStore = require('./stores/console')
const codeEditorStore = require('./stores/codeeditor')

let app = choo()
// app.use(devtools())
app.use(routerStore)
app.use(connectionStore)
app.use(consoleStore)
app.use(codeEditorStore)
app.route('/', mainView)
app.route('/help', helpView)
app.mount('body')

setTimeout(() => {
    app.emit('boot')
}, 1)
