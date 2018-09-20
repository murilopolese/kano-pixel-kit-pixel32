const html = require('choo/html')

Array.prototype.includes = function(value) {
    return this.indexOf(value) !== -1
}
String.prototype.characterize = function(callback) {
    var characters = this.split('');
    var options = {};

    for (var i = 0; i < this.length; i++) {
        options = callback(characters[i]);
    }
}

var $keywords = ['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];
var $functions = ['abs', 'dict', 'help', 'min', 'setattr', 'all', 'dir', 'hex', 'next', 'slice', 'any', 'divmod', 'id', 'object', 'sorted', 'ascii', 'enumerate', 'input', 'oct', 'staticmethod', 'bin', 'eval', 'int', 'open', 'str', 'bool', 'exec', 'isinstance', 'ord', 'sum', 'bytearray', 'filter', 'issubclass', 'pow', 'super', 'bytes', 'float', 'iter', 'print', 'tuple', 'callable', 'format', 'len', 'property', 'type', 'chr', 'frozenset', 'list', 'range', 'vars', 'classmethod', 'getattr', 'locals', 'repr', 'zip', 'compile', 'globals', 'map', 'reversed', '_import_', 'complex', 'hasattr', 'max', 'round', 'delattr', 'hash', 'memoryview', 'set'];

function tokenize (inputString) {
    var tokens = [];
    var lexedValue = '';
    var currentToken = null;

    let newSpaceToken = () => {
        currentToken = { type: 'space', value: ' ' };
        lexedValue = '';
    }

    let parseLexedValueToToken = () => {
        if (lexedValue) {
            if ($keywords.includes(lexedValue)) {
                tokens.push({ type: 'keyword', value: lexedValue })
            } else if ($functions.includes(lexedValue)) {
                tokens.push({ type: 'function', value: lexedValue })
            } else if (lexedValue !== '') {
                if (isNaN(lexedValue)) {
                    tokens.push({ type: 'default', value: lexedValue })
                } else {
                    tokens.push({ type: 'number', value: lexedValue })
                }
            }
            lexedValue = '';
        }
    }

    let lex = (char) => {
        if (char !== ' ' && currentToken && currentToken.type === 'space' ) {
            tokens.push(currentToken);
            lexedValue = '';
            currentToken = null;
        }

        switch(char) {
            case ' ':
            if ($keywords.includes(lexedValue)) {
                tokens.push({ type: 'keyword', value: lexedValue })
                newSpaceToken();
            } else if ($functions.includes(lexedValue)) {
                tokens.push({ type: 'function', value: lexedValue })
                newSpaceToken();
            } else if (lexedValue !== '') {
                if (isNaN(lexedValue)) {
                    tokens.push({ type: 'default', value: lexedValue })
                } else {
                    tokens.push({ type: 'number', value: lexedValue })
                }
                newSpaceToken();
            } else if (currentToken) {
                currentToken.value += ' '
            } else {
                newSpaceToken();
            }
            break;

            case '"':
            case '\'':
            if (currentToken) {
                if (currentToken.type === 'string') {
                    if (currentToken.value[0] === char) {
                        currentToken.value += char
                        tokens.push(currentToken)
                        currentToken = null;
                    } else {
                        currentToken.value += char
                    }
                } else if (currentToken.type === 'comment') {
                    currentToken.value += char
                }
            } else {
                if (lexedValue) {
                    tokens.push({ type: 'default', value: lexedValue });
                    lexedValue = '';
                }
                currentToken = { type: 'string', value: char }
            }
            break;

            case '=':
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '&':
            case '|':
            case '>':
            case '<':
            case '!':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                tokens.push({ type: 'operator', value: char })
            }
            break;

            case '#':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                currentToken = { type: 'comment', value: char }
            }
            break;

            case ':':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                tokens.push({ type: 'colon', value: char });
            }
            break;

            case '(':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                tokens.push({ type: 'left-parentheses', value: char });
            }
            break;

            case ')':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                tokens.push({ type: 'right-parentheses', value: char });
            }
            break;

            case '[':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                tokens.push({ type: 'left-bracket', value: char });
            }
            break;

            case ']':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                tokens.push({ type: 'right-bracket', value: char });
            }
            break;

            case ',':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                tokens.push({ type: 'comma', value: char });
            }
            break;

            case '\n':
            if (currentToken) {
                switch(currentToken.type) {
                    case 'string':
                    case 'comment':
                    tokens.push(currentToken)
                    currentToken = null;
                    break;
                    default:
                }
            } else {
                parseLexedValueToToken();
                lexedValue = '';
            }
            tokens.push({ type: 'newline', value: '\n' });
            break;

            case ';':
            if (currentToken) {
                currentToken.value += char;
            } else {
                parseLexedValueToToken();
                tokens.push({ type: 'semicolon', value: char });
            }
            break;

            default:
            if (currentToken) {
                currentToken.value += char;
            } else {
                lexedValue += char
            }

            break;
        }
    }

    /* Lexing the input codes */
    inputString.characterize(lex);

    /* Rest of the lexed value or token which is unfinished */
    parseLexedValueToToken();

    if (currentToken) tokens.push(currentToken)

    /* Secondary Parse to Match Some Patterns */
    var isFunctionArgumentScope = false;
    var tokenCount = tokens.length;
    for (var i = 0; i < tokenCount; i++) {
        var token = tokens[i];
        if (token.type === 'keyword' && (token.value === 'def' || token.value === 'class')) {
            var peekToken = tokens[i + 2]
            if (peekToken && peekToken.type === 'default') peekToken.type = 'function-name';
        } else if (token.type === 'default' && isFunctionArgumentScope) {
            token.type = 'argument';
        } else if (token.type === 'left-parentheses') {
            var peekToken = tokens[i - 1]
            if (peekToken && peekToken.type === 'function-name') isFunctionArgumentScope = true;
        } else if (token.type === 'right-parentheses') {
            isFunctionArgumentScope = false;
        }
    }

    return tokens
}

function codeEditorStore(state, emitter) {
    codeeditor = {
        code: '',
        highlighted: ''
    }
    state.codeeditor = codeeditor

    function resetHighlighted() {
        state.codeeditor.highlighted = html`<pre id="highlight-area" class="textarea"></pre>`
    }
    resetHighlighted()

    // load code stored on localStorage
    setTimeout(() => {
        try {
            let code = localStorage.getItem('code')
            emitter.emit('load-code', code)
        } catch(e) { console.log(e) }
    }, 1)

    emitter.on('load-code', (code) => {
        state.codeeditor.code = code
        emitter.emit('highlight')
    })
    emitter.on('input', (e) => {
        state.codeeditor.code = e.target.value
        emitter.emit('save')
        emitter.emit('highlight')
    })
    emitter.on('scroll-editor', (e) => {
        let codeView = document.querySelector('#textarea-input')
        let highlightView = document.querySelector('#highlight-area')
        highlightView.scrollTop = codeView.scrollTop;
    })
    emitter.on('tab', (e) => {
        let cursor = e.target.selectionStart
        let code = e.target.value
        code = [code.substr(0, cursor), '  ', code.substr(cursor)].join('')
        state.codeeditor.code = code
        emitter.emit('save')
        emitter.emit('highlight')
    })
    emitter.on('save', () => {
        try {
            localStorage.setItem('code', state.codeeditor.code)
        } catch(e) { console.log(e) }
    })
    emitter.on('highlight', () => {
        let tokens = tokenize(state.codeeditor.code);
        resetHighlighted()
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            let span = document.createElement('span');
            span.className = 'highlight-' + token.type;
            span.innerText = token.value;
            state.codeeditor.highlighted.appendChild(span);
        }
        var lines = state.codeeditor.code.split('\n');
        if (lines[lines.length - 1] === '') {
            var br = document.createElement('br');
            state.codeeditor.highlighted.appendChild(br);
        }
        emitter.emit('render')
        emitter.emit('scroll-editor')
    })
    emitter.on('dragging', (dragging) => {
        if(dragging) {
            document.body.style.opacity = 0.5
        } else {
            document.body.style.opacity = 1
        }
    })
    emitter.on('dragover', (dragging) => {
        emitter.emit('dragging', true)
    })
    emitter.on('dragleave', (dragging) => {
        emitter.emit('dragging', false)
    })
    emitter.on('dragdrop', (file) => {
        emitter.emit('dragging', false)
        let reader = new FileReader();
        reader.onload = () => {
            emitter.emit('load-code', reader.result)
            emitter.emit('save')
        }
        reader.readAsText(file)
    })
}

module.exports = codeEditorStore
