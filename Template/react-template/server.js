var liveServer = require('live-server');
// 代理
var proxy = require('http-proxy-middleware');
// 开启 gzip
var compression = require('compression');
// gzip 压缩
var zlib = require('zlib');
// rewrite
var history = require('connect-history-api-fallback');

var params = {
    port: 10086, // Set the server port. Defaults to 8080.
    host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: './cdn', // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 100, // Waits for all changes, before reloading. Defaults to 0 sec.
    middleware: [
        // history({
        //     logger: console.log.bind(console),
        //     rewrites: [{ from: /\/react\//, to: '/index.html' }]
        // }),
        proxy('/api', {
            // target: 'http://localhost:3000',
            changeOrigin: true
        }),
        compression({
            filter: function() {
                // 所有资源启动 gzip
                return true;
            },
            level: 9,
            // 对 png 图片更好的gzip加载
            strategy: zlib.Z_RLE
        })
    ]
};
liveServer.start(params);
