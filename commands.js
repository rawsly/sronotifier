const COMMANDS = Object.freeze({
    PING: {
        code: 'PING',
        commandName: 'ping',
    },
    SERVER: {
        code: 'SERVER',
        commandName: 'server',
    },
    USER: {
        code: 'USER',
        commandName: 'user',
    },
    CLEAR_ALL: {
        code: 'CLEAR_ALL',
        commandName: 'clear'
    }
});

module.exports = { COMMANDS };