const asciiHeader = `     __\r
   _[  ]___________\r
  |oooooooooooooooo|   KANO PIXEL KIT\r
  |oooooooooooooooo|   Code with light.\r
  |oooooooooooooooo|\r
  |oooooooooooooooo|   https://kano.me/\r
  | O          O O |\r
  |________________|\r
`
const offlineBootMsg = `\r
Oh, hi! You are currently disconnected from \r
your Pixel Kit.\r
\r
Type the ip in decimal or binary format to\r
connect. Type help if you have questions.\r
`
const onlineBootMsg = `\r
Nice! You are currently connected to \r
the MicroPython REPL on your Pixel Kit!\r
\r
REPL stands for Read, Evaluate, Print\r
and Loop. Type docs() to learn more.\r
`
const offlineHelpMsg = `
\r\x1b[38;2;102;217;239m
╔=========================================╗\r
║                CONNECTING               ║\r
╚=========================================╝\r
\r\x1b[38;2;255;255;255m
When your Pixel Kit is connected to a wifi\r
network it will display its ip address in\r
binary format. Red dots mean 1, no dots\r
mean 0.\r
\r
Check if your Pixel Kit and computer are on\r
the same network, either the one Pixel Kit\r
created itself or the one you connected it\r
to, and type the ip address in binary or \r
decimal format. It will look something \r
like this:\r
\r
> 11000000101010000000010000000001\r
or\r
> 192.168.4.1\r
\r\x1b[38;2;102;217;239m
╔=========================================╗\r
║              BOOT SCREENS               ║\r
╚=========================================╝\r
\r\x1b[38;2;255;255;255m
When your Pixel Kit boots up it shows a few\r
screens to let you know what it's doing and\r
it's state. Here is what they mean:\r
\r
- \x1b[38;2;253;151;31mOrange\x1b[38;2;255;255;255m\r
  Trying to connect.\r
\r
- \x1b[38;2;102;217;239mBlue\x1b[38;2;255;255;255m\r
  Created its own wifi network. It should\r
  be named something like PIXEL_KIT_XXXX\r
  but with a number insted of the XXXX.\r
\r
- \x1b[38;2;166;226;46mGreen\x1b[38;2;255;255;255m\r
  Connected to a wifi network.\r
\r
- \x1b[38;2;249;38;114mRed\x1b[38;2;255;255;255m\r
  Tried to connect to a wifi network and\r
  failed.\r
\r
Turn your Pixel Kit off and on again while\r
holding both red buttons to gently force\r
Pixel Kit to show the blue screen.\r
\r
`

class App {
    constructor() {
        this.cmdBuffer = []
        try {
            let cmdBuffer = localStorage.getItem('cmdBuffer')
            if (cmdBuffer) {
                this.cmdBuffer = JSON.parse(cmdBuffer)
            }
        } catch(e) { console.log(e) }
        this.cmdBufferIndex = 0
        this.term = null
        this.repl = null
        this.initTerminal()
        this.bootOffline()
    }

    initTerminal() {
        this.term = new Terminal({
            allowTransparency: true,
            fontSize: parseInt(window.innerHeight/30),
            letterSpacing: 2,
            lineHeight: 1.2,
            cols: 45,
            rows: 17,
            theme: {
                background: 'transparent',
                foreground: '#ffffff'
            }
        })
        this.term.setColor = (r, g, b) => {
            this.term.write('\x1b[38;2;'+r+';'+g+';'+b+'m')
        }
        this.term.open(document.getElementById('terminal'))
        this.term.on('paste', (data, ev) => {
            this.term.write(data);
        })
    }

    saveCmdBuffer() {
        try {
            localStorage.setItem('cmdBuffer', JSON.stringify(this.cmdBuffer.slice(0, 5)))
            console.log(localStorage.getItem('cmdBuffer'))
        } catch(e) { console.log(e) }
    }

    bootOffline() {
        this.term.prompt = () => {
            this.term.write(`\r\n> `)
            this.cmdBuffer.splice(0, 0, '')
        }
        this.term.setColor(253,151,31)
        this.term.write(asciiHeader)
        this.term.setColor(255, 255, 255)
        this.term.write(offlineBootMsg)
        this.term.prompt()
        this.term.on('key', this.disconnectedHandler.bind(this))
    }

    bootOnline() {
        this.term.clear()
        this.term.write('\b \b')
        this.term.write('\b \b')
        this.term.prompt = () => {}
        this.term.setColor(166,226,46)
        this.term.write(asciiHeader)
        this.term.setColor(255, 255, 255)
        this.term.write(onlineBootMsg)
        this.term.on('key', this.connectedHandler().bind(this))
    }

    disconnectedHandler(key, ev) {
        let parseCmd = (cmd) => {
            if(cmd == 'help') {
                this.term.write('\r\n')
                this.term.clear()
                this.term.write(offlineHelpMsg)
                this.term.write('\r\n')
                this.term.setColor(253,151,31)
                this.term.write(asciiHeader)
                this.term.setColor(255,255,255)
                this.term.write(offlineBootMsg)
                this.term.prompt()
                let view = this.term.element.querySelector('.xterm-viewport')
                setTimeout(() => {
                    view.scrollTo(0, 0)
                }, 50)
            } else if(cmd.split('.').length === 4) {
                this.term.write('\r\nConnecting...\r\n')
                this.term._core.removeAllListeners('key')
                this.connectIp(cmd)
            } else if(cmd.length ===4*8) {
                this.term.write('\r\nConnecting...\r\n')
                this.term._core.removeAllListeners('key')
                this.connectBinary(cmd)
            } else {
                if(cmd) {
                    this.term.write('\r\nUnrecognized command')
                }
                this.term.prompt()
            }
        }
        let clearLine = () => {
            this.term._core.buffers.active.x = this.term.cols
            for (let i = 0; i < this.term.cols-2; i++) {
                this.term.write('\b \b')
            }
        }
        let x = this.term._core.buffers.active.x
        let arrowDown = ev.code == 'ArrowDown'
        let arrowUp = ev.code == 'ArrowUp'
        let arrowLeft = ev.code == 'ArrowLeft'
        let arrowRight = ev.code == 'ArrowRight'
        let printable = (
            !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
            && !arrowLeft && !arrowRight && !arrowUp && !arrowDown
        )
        if (ev.keyCode == 13) {
            if(this.cmdBuffer[0] && this.cmdBuffer[0] != this.cmdBuffer[1]) {
                this.saveCmdBuffer()
            }
            parseCmd(this.cmdBuffer[0])
        } else if (ev.keyCode == 8) {
            // Delete last character
            if (x > 2) {
                this.term.write('\b \b')
                this.cmdBuffer[0] = this.cmdBuffer[0].slice(0, -1)
            }
        } else if (printable) {
            this.cmdBuffer[0] += key
            this.cmdBufferIndex = 0
            this.term.write(key)
        } else {
            let arrowDown = ev.code == 'ArrowDown'
            let arrowUp = ev.code == 'ArrowUp'
            let arrowLeft = ev.code == 'ArrowLeft'
            let arrowRight = ev.code == 'ArrowRight'
            if (arrowUp || arrowDown) {
                if(arrowUp) {
                    this.cmdBufferIndex = (this.cmdBufferIndex + 1) % this.cmdBuffer.length
                }
                if(arrowDown) {
                    this.cmdBufferIndex = (this.cmdBufferIndex - 1) % this.cmdBuffer.length
                }
                clearLine()
                let newLine = this.cmdBuffer[this.cmdBufferIndex%this.cmdBuffer.length]
                this.term.write(newLine)
                this.cmdBuffer[0] = newLine
            }
        }
    }

    connectIp(ip) {
        try {
            this.repl = new WebREPL({
                ip: ip,
                password: '123456',
                autoconnect: false
            })
            this.repl.onConnected = () => {
                this.bootOnline()
            }
            this.repl.connect()
        } catch(e) {
            console.log(e)
        }
    }

    connectBinary(cmd) {
        let binaryIp = []
        for (let i = 0; i < 4; i++) {
            binaryIp.push(cmd.substr(8*i, 8))
        }
        let decimalIp = binaryIp.map((binaryNumber) => {
            return parseInt(binaryNumber, 2)
        })
        this.connectIp(decimalIp.join('.'))
    }

    connectedHandler() {
        let isConnected = false
        this.repl.onMessage = (msg) => {
            if (typeof msg != 'string') {
                return
            }
            if (isConnected) {
                if (msg.indexOf('!open') == 0) {
                    console.log(msg, msg.split(' '))
                    window.open(msg.split(' ')[1])
                } else {
                    this.term.write(msg)
                }
            } else {
                isConnected = msg.indexOf('WebREPL connected') != -1
                if (isConnected) {
                    this.repl.eval('\r\n')
                }
            }
        }
        return (key, ev) => {
            this.repl.eval(key)
        }
    }
}

let app = new App()
