import Hapi from 'hapi';

async function init() {

    const server = new Hapi.Server({
        host: 'localhost',
        port: 8080
    });
    // register a module within the instance of the API. The callback is then used to tell that the loaded module will be used as an authentication strategy.

    server.route(require('./routes/create-ballot'));
    server.route(require('./routes/ballot'));
    server.route(require('./routes/vote'));
    await server.start();
    console.log('Server started at: ' + server.info.uri);
}
init();
