function routerStore (state, emitter) {
    let router = {
        active: 'console'
    }
    state.router = router
    emitter.on('switch-views', function () {
        switch(state.router.active) {
            case 'console':
                state.router.active = 'editors'
                emitter.emit('highlight')
            break
            case 'editors':
                state.router.active = 'console'
            break
        }
        emitter.emit('render')
    })
}

module.exports = routerStore
