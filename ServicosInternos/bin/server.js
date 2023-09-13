const http = require('http')
const app = require('../src/app')
const port = buscarPorta(process.env.PORT || '3002')
const server = http.createServer(app)

//console.log(server)    ver os valores do servidor

server.listen(port)
server.on('error', onError)
server.on('listen', onListening)

console.log(`Api executada na porta ${port}`)

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;

    switch (error.code) {
        case "EACCESS":
            console.log(bind + 'required elevated privileges');
            process.exit(i);
        break;
        case "EADDRINUSE":
            console.error(bind + 'is already in use');
            process.exit(1);
        break
        default:
            throw error;
    }
}

function onListening(){
    var addr = server.address();
    var bind = typeof addr === 'string' ? `pipe ${addr}` : `${addr.family}:${addr.port}`
    debug('Listening on ' + bind)

}

function buscarPorta(val) {
    const port = parseInt(val, 10);

    if (isNaN(port))
        return val;
    if (port > 0)
        return port;

    return false;

}