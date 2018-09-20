/**
Manipulate and parse console.
*/

const HELP =`
############################################
#        PIXEL32 REAL TINY COMPUTER        #
############################################

Oh, hey! Welcome to the PIXEL32 COMMAND LINE

Press <ESC> to switch between COMMAND LINE
and CODE EDITOR.

Commands available:

help plx
  Send help, please...

connect
  Does what is says

clear
  Clean up your screen (use with caution).

reset
  Soft reset your RPK. Needs to be
  connected.

run
  Execute the code from editor. Needs to be
  connected.

ls
  List the files on your board. Needs to be
  connected.

load filename.py
  Load content from a file to CODE EDITOR.
  Needs to be connected.

save filename.py
  Save the content from CODE EDITOR to file.
  Needs to be connected.

remove filename.py
  Remove file from board. Needs to be
  connected

Once you are connected, everything else than
the commands above will be interpreted as
MicroPython.

To print values on screen, use the function
log(). It works like this:

> log('hello world')
["hello world"]

`

function consoleStore (state, emitter) {
    let consoleState = {
        out: '',
        readOnly: true
    }
    state.console = consoleState
    emitter.on('disable-console', function() {
        state.console.readOnly = true
        emitter.emit('render')
    })
    emitter.on('enable-console', function() {
        state.console.readOnly = false
        emitter.emit('render')
    })
    emitter.on('scroll-console', function() {
        let consoleView = document.querySelector('#console-input')
        consoleView.scrollTop = consoleView.scrollHeight
    })
    emitter.on('print', function(msg) {
        state.console.out += msg
        emitter.emit('render')
        emitter.emit('scroll-console')
    })
    emitter.on('println', function(msg) {
        msg = msg || ''
        state.console.out += msg + '\n'
        emitter.emit('render')
        emitter.emit('scroll-console')
    })
    emitter.on('new-line', function(msg) {
        emitter.emit('print', '\n> ')
    })
    emitter.on('backspace', function(msg) {
        state.console.out = state.console.out.substr(0, state.console.out.length-1)
        emitter.emit('render')
    })
    emitter.on('clear', function(msg) {
        state.console.out = ''
        emitter.emit('render')
    })
    emitter.on('evaluate', function(code) {
        let commands = code.split(' ')
        switch(commands[0]) {
            case 'help':
                if(commands[1] == 'plx') {
                    window.open('index.html#help')
                    emitter.emit('new-line')
                } else {
                    emitter.emit('print', HELP)
                    emitter.emit('new-line')
                }
            break
            case 'connect':
                emitter.emit('connect', commands[1])
            break
            case 'run':
                emitter.emit('run')
            break
            case 'reset':
                emitter.emit('reset')
            break
            case 'clear':
                emitter.emit('clear')
                emitter.emit('print', '> ')
            break
            case 'ls':
                emitter.emit('listdir')
            break
            case 'load':
                emitter.emit('load-file-content', commands[1])
            break
            case 'save':
                emitter.emit('create-file', commands[1])
            break
            case 'remove':
                emitter.emit('remove-file', commands[1])
            break
            default:
                emitter.emit('eval', code)
        }
    })
    emitter.on('boot', function() {
        emitter.emit('clear')
        emitter.emit('print',
`PIXEL32 REAL TINY COMPUTER
https://kano.me

${state.connection.ws?'Connected to '+state.connection.ip:'Not connected'}

hello! type help for help

> `)
        emitter.emit('enable-console')
    })
}

module.exports = consoleStore
