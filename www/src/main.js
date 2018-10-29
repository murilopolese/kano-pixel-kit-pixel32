window.onload = () => {
    // Create variable for repl
    let repl
    // Autosave timeout id and delay time
    let autoSaveTimeout = 0
    let autoSaveDelay = 2000

    // Hide loading when window is loaded
    let loading = document.querySelector('#loading')
    loading.style.display = 'none'

    // Get HTML elements
    let shell = document.querySelector('pixel32-shell')
    let terminal = document.querySelector('pixel32-terminal')
    let textEditor = document.querySelector('pixel32-text-editor')
    let runButton = document.querySelector('#run')
    let stopButton = document.querySelector('#stop')

    // Setting up router
    let root = null;
    let useHash = true; // Defaults to: false
    let hash = '#!'; // Defaults to: '#'
    let router = new Navigo(root, useHash, hash);
    router.on('/editor', function() {
        shell.setAttribute('selected', 'editor')
        textEditor.editor.refresh()
    })
    router.on('/terminal', function() {
        shell.setAttribute('selected', 'terminal')
    })
    router.on('/docs', function() {
        shell.setAttribute('selected', 'docs')
        shell.setAttribute('fullheight', true)
    })
    router.on(function() {})
    router.resolve()

    // offline terminal handler
    let termHandler = new TerminalHandler(terminal.term)
    // Print offline message
    termHandler.bootOffline()
    // Create a reference for keyboard input handler and bind it to terminal
    let disconnectedOnKey = termHandler.onKey.bind(termHandler)
    terminal.addEventListener('key', disconnectedOnKey)
    // Once terminal parses a command to connect, it calls `connectIp`
    termHandler.connectIp = (ip) => {
        // Unbind keyboard input handler
        terminal.removeEventListener('key', disconnectedOnKey)

        terminal.write('\r\n')
        terminal.write('Connecting...\r\n')

        // Connect to WebREPL
        repl = new WebREPL.WebREPL({
            ip: ip,
            password: '123456',
            autoConnect: true,
            autoAuth: true
        })

        repl.on('authenticated', () => {
            // Print connected terminal header
            termHandler.bootOnline()
            terminal.addEventListener('key', (e) => {
                repl.eval(e.detail.key)
            })
            repl.on('output', (msg) => {
                terminal.write(msg)
            })
            repl.eval('\r\n')
            runButton.addEventListener('click', runCode)
            stopButton.addEventListener('click', stopCode)
            enableButtons()
        })
    }

    // Load code from local storage
    try {
        let code = localStorage.getItem('code')
        if (code) {
            textEditor.setValue(code)
        }
    } catch(e) { console.log(e) }
    // Debounce change events to autosave code on local storage
    textEditor.addEventListener('change', (e) => {
        clearTimeout(autoSaveTimeout)
        autoSaveTimeout = setTimeout(() => {
            try {
                localStorage.setItem('code', textEditor.getValue())
            } catch(e) { console.log(e) }
        }, autoSaveDelay)
    })

    // Toggle availability of run/stop buttons
    let enableButtons = () => {
        runButton.removeAttribute('disabled')
        stopButton.removeAttribute('disabled')
    }
    let disableButtons = () => {
        runButton.setAttribute('disabled', true)
        stopButton.setAttribute('disabled', true)
    }

    let runCode = () => {
        disableButtons()
        router.navigate('/terminal')
        repl.execFromString(textEditor.getValue(), 30)
            .then(() => {
                enableButtons()
                router.navigate('/editor')
            })
    }
    let stopCode = () => {
        repl.sendStop()
    }
}
