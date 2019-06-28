var liveServer = require("live-server");
// 代理
var proxy = require("http-proxy-middleware");
// 开启 gzip
var compression = require('compression');

var params = {
    port: 10086, // Set the server port. Defaults to 8080.
    host: 'localhost', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: 'cdn', // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 100, // Waits for all changes, before reloading. Defaults to 0 sec.
    middleware: [
        proxy('/api', {
            target: 'http://localhost:3000',
            // target: "http://62.234.133.41:3000",
            changeOrigin: true
        }),
        compression()
    ]
};
liveServer.start(params);
