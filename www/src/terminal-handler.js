// Simple handler for terminal when disconnected
class TerminalHandler {
    // term must be an instance of Terminal (xtermjs)
    constructor(term) {
        this.term = term
        this.cmdBuffer = ['']
        this.cmdBufferIndex = 0
        this.loadCmdBuffer()
    }

    loadCmdBuffer() {
        try {
            let cmdBuffer = localStorage.getItem('cmdBuffer')
            if (cmdBuffer) {
                this.cmdBuffer = JSON.parse(cmdBuffer)
            }
        } catch(e) { console.log(e) }
    }

    saveCmdBuffer() {
        try {
            localStorage.setItem('cmdBuffer', JSON.stringify(this.cmdBuffer.slice(0, 5)))
        } catch(e) { console.log(e) }
    }

    clearLine() {
        this.term._core.buffers.active.x = this.term.cols
        for (let i = 0; i < this.term.cols-2; i++) {
            this.term.write('\b \b')
        }
    }

    prompt() {
        if (this.cmdBuffer[0]) {
            this.cmdBuffer.splice(0, 0, '')
        }
        this.term.write(`\r\n> `)
    }


    parseCmd(cmd) {
        if (!cmd || cmd.trim() == '') {
            this.prompt()
        } else if(cmd.split('.').length === 4) {
            this.connectIp(cmd)
        } else if(cmd.length ===4*8) {
            this.connectBinary(cmd)
        } else {
            if(cmd) {
                this.term.write('\r\nUnrecognized command')
            }
            this.prompt()
        }
    }

    connectIp(ip) {}

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

    // Handle 'key' events from disconnected terminal
    onKey(e) {
        let key = e.detail.key
        let ev = e.detail.ev
        let arrowDown = ev.code == 'ArrowDown'
        let arrowUp = ev.code == 'ArrowUp'
        let arrowLeft = ev.code == 'ArrowLeft'
        let arrowRight = ev.code == 'ArrowRight'
        let isPrintable = (
            !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
            && !arrowLeft && !arrowRight && !arrowUp && !arrowDown
        )
        if (ev.keyCode == 13) { // ENTER
            if(this.cmdBuffer[0] && this.cmdBuffer[0] != this.cmdBuffer[1]) {
                this.saveCmdBuffer()
            }
            this.parseCmd(this.cmdBuffer[0])
        } else if (ev.keyCode == 8) { // BACKSPACE
            let x = this.term._core.buffers.active.x
            // Delete last character
            if (x > 2) {
                this.term.write('\b \b')
                this.cmdBuffer[0] = this.cmdBuffer[0].slice(0, -1)
            }
        } else if (isPrintable) { // PRINTABLE CHARACTER
            this.cmdBuffer[0] += key
            this.cmdBufferIndex = 0
            this.term.write(key)
        } else { // ARROWS
            if (arrowUp || arrowDown) {
                if(arrowUp) {
                    this.cmdBufferIndex = (this.cmdBufferIndex + 1) % this.cmdBuffer.length
                }
                if(arrowDown) {
                    this.cmdBufferIndex = (this.cmdBufferIndex - 1) % this.cmdBuffer.length
                }
                this.clearLine()
                let newLine = this.cmdBuffer[this.cmdBufferIndex%this.cmdBuffer.length]
                this.term.write(newLine)
                this.cmdBuffer[0] = newLine
            }
        }
    }

    bootOffline() {
        this.term.setColor(253,151,31)
        this.term.write(asciiHeader)
        this.term.setColor(255, 255, 255)
        this.term.write(offlineBootMsg)
        this.prompt()
    }

    bootOnline() {
        this.term.clear()
        this.term.write('\b \b')
        this.term.write('\b \b')
        this.term.setColor(166,226,46)
        this.term.write(asciiHeader)
        this.term.setColor(255, 255, 255)
        this.term.write(onlineBootMsg)
    }
}
