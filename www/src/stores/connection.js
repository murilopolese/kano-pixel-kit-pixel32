/**
Connect to Pixel Kit, send and handle messages to and from it.
*/

function connect (ip) {
    return new Promise((resolve, reject) => {
        try {
            let ws = new WebSocket(`ws://${ip}`)
            ws.onopen = (e) => {
                resolve(ws)
            }
            ws.onerror = (err) => {
                reject(err)
            }
        } catch(e) {
            reject(e)
        }

    })
}
function resetBoard (ws) {
    data = {
        exec: 'import machine;machine.reset()'
    }
    ws.send(JSON.stringify({
        messageType: 'requestAction',
        data: data
    }))
}
function execCode (ws, code) {
    ws.send(JSON.stringify({
        messageType: 'requestAction',
        data: {
            exec: code
        }
    }))
}
function listDir (ws, path) {
    path = path || ''
    ws.send(JSON.stringify({
        messageType: 'requestAction',
        data: {
            listdir: path
        }
    }))
}
function loadFileContent (ws, path) {
    ws.send(JSON.stringify({
        messageType: 'requestAction',
        data: {
            load_file_content: path
        }
    }))
}
function createFile (ws, path, content) {
    ws.send(JSON.stringify({
        messageType: 'requestAction',
        data: {
            create_file: { path, content }
        }
    }))
}
function removeFile (ws, path, content) {
    ws.send(JSON.stringify({
        messageType: 'requestAction',
        data: {
            remove_file: path
        }
    }))
}

function connectionStore (state, emitter) {
    let connection = {
        ip: null,
        ws: null,
        interval: 0
    }
    state.connection = connection

    // Try to load ip from local storage
    try {
        let ip = localStorage.getItem('ip')
        if(ip) {
            state.connection.ip = ip
        }
    } catch(err) { console.log(err) }

    emitter.on('connect', function(ip) {
        emitter.emit('println')
        // If no `ip` is passed, use the state or the hostname.
        if(!ip) { ip = state.connection.ip }
        if(!ip) { ip = location.host }
        if(!ip) {
            emitter.emit('print', `You must provide an ip to connect`)
            emitter.emit('new-line')
        } else {
            // remember ip by saving on local storage
            state.connection.ip = ip
            try {
                localStorage.setItem('ip', ip)
            } catch(err) { console.log(e) }
            emitter.emit('println', `Connecting to Pixel Kit on ip: ${ip}`)
            emitter.emit('disable-console')
            /*
            Start an interval that will keep track of timeout and some
            loading "status/animation"
            */
            let timeout = 50
            state.connection.interval = setInterval(() => {
                emitter.emit('print', '.')
                timeout -= 1
                if(timeout < 0) {
                    clearInterval(state.connection.interval)
                    emitter.emit('connected')
                }
            }, 500)

            connect(state.connection.ip)
                .then(function(conn) {
                    emitter.emit('connected', conn)
                })
                .catch(function(err) {
                    emitter.emit('connected')
                })
        }
    })
    emitter.on('connected', function(conn) {
        clearInterval(state.connection.interval)
        if(conn) {
            state.connection.ws = conn
            state.connection.ws.onmessage = (e) => {
                try {
                    let msg = JSON.parse(e.data)
                    switch(msg.messageType) {
                        case 'event':
                        case 'listdir':
                        case 'load_file_content':
                        case 'create_file':
                        case 'remove_file':
                            emitter.emit('event', msg)
                        break
                    }
                } catch(e) { console.log(e) }
            }
        } else {
            state.ws = false
        }
        emitter.emit('boot')
    })
    emitter.on('event', function(msg) {
        if(msg.data.log) {
            emitter.emit('println')
            try {
                emitter.emit('print', JSON.stringify(msg.data.log))
            } catch(e) {
                emitter.emit('print', msg.data.log)
            }
        }
        if(msg.data.listdir) {
            emitter.emit('println')
            emitter.emit('print', msg.data.listdir.list.join('\n'))
        }
        if(msg.data.load_file_content) {
            console.log(msg.data.load_file_content)
            emitter.emit('load-code', msg.data.load_file_content.content.join(''))
            emitter.emit('save')
        }
        if(
            msg.data.code_executed
            || msg.data.listdir
            || msg.data.load_file_content
            || msg.data.create_file
            || msg.data.remove_file
            ) {
            emitter.emit('new-line')
            emitter.emit('enable-console')
        }
    })
    emitter.on('run', function() {
        emitter.emit('disable-console')
        if(state.connection.ws) {
            execCode(state.connection.ws, state.codeeditor.code)
        } else {
            emitter.emit('println')
            emitter.emit('print', 'You must be connected to run code')
            emitter.emit('new-line')
            emitter.emit('enable-console')
        }
    })
    // Evaluate single line expression (console)
    emitter.on('eval', function(code) {
        emitter.emit('disable-console')
        if(!code) {
            emitter.emit('new-line')
            emitter.emit('enable-console')
        } else {
            if(state.connection.ws) {
                execCode(state.connection.ws, code)
            } else {
                emitter.emit('println')
                emitter.emit('print', 'You must be connected to evaluate code')
                emitter.emit('new-line')
                emitter.emit('enable-console')
            }
        }
    })
    emitter.on('reset', function() {
        if(state.connection.ws) {
            emitter.emit('disable-console')
            emitter.emit('println')
            emitter.emit('println', 'Reseting Pixel Kit. This can take a while...')
            resetBoard(state.connection.ws)
            let resetingInterval = setInterval(() => {
                emitter.emit('print', '.')
            }, 500)
            // Wait 10 seconds before reconnecting
            setTimeout(() => {
                clearInterval(resetingInterval)
                emitter.emit('connect')
            }, 10000)
        } else {
            emitter.emit('println')
            emitter.emit('print', 'You must be connected to reset')
            emitter.emit('new-line')
            emitter.emit('enable-console')
        }
    })
    emitter.on('listdir', () => {
        if(state.connection.ws) {
            emitter.emit('disable-console')
            listDir(state.connection.ws)
        } else {
            emitter.emit('println')
            emitter.emit('print', 'You must be connected to list files')
            emitter.emit('new-line')
            emitter.emit('enable-console')
        }
    })
    emitter.on('load-file-content', (filename) => {
        if(state.connection.ws) {
            emitter.emit('disable-console')
            if(filename) {
                loadFileContent(state.connection.ws, filename)
            } else {
                emitter.emit('println')
                emitter.emit('print', 'You must provide a filename')
                emitter.emit('new-line')
                emitter.emit('enable-console')
            }
        } else {
            emitter.emit('println')
            emitter.emit('print', 'You must be connected to load files')
            emitter.emit('new-line')
            emitter.emit('enable-console')
        }
    })
    emitter.on('create-file', (filename) => {
        if(state.connection.ws) {
            emitter.emit('disable-console')
            if(filename) {
                createFile(state.connection.ws, filename, state.codeeditor.code)
            } else {
                emitter.emit('println')
                emitter.emit('print', 'You must provide a filename')
                emitter.emit('new-line')
                emitter.emit('enable-console')
            }
        } else {
            emitter.emit('println')
            emitter.emit('print', 'You must be connected to save files')
            emitter.emit('new-line')
            emitter.emit('enable-console')
        }
    })
    emitter.on('remove-file', (filename) => {
        if(state.connection.ws) {
            emitter.emit('disable-console')
            if(filename) {
                removeFile(state.connection.ws, filename)
            } else {
                emitter.emit('println')
                emitter.emit('print', 'You must provide a filename')
                emitter.emit('new-line')
                emitter.emit('enable-console')
            }
        } else {
            emitter.emit('println')
            emitter.emit('print', 'You must be connected to load files')
            emitter.emit('new-line')
            emitter.emit('enable-console')
        }
    })
}

module.exports = connectionStore
