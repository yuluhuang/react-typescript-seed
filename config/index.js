const path = require('path');

module.exports = {
    dev: {
        host: 'localhost',
        port: 9081,
        proxyTable: {
            '/api': {
                target: 'http://127.0.0.1:8085',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/auth': {
                target: 'http://127.0.0.1:8085',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/auth': '/auth'
                }
            },
            '/public': {
                target: 'http://127.0.0.1:8085',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/public': '/public'
                }
            },
        },
        useEslint: false,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        showEslintErrorsInOverlay: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        devtool: 'cheap-module-eval-source-map',
        poll: false,
        cacheBusting: true,
        cssSourceMap: true
    },
    build: {
        bundleAnalyzerReport: true,
        index: path.resolve(__dirname, '../dist/index.html'),
        // app: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
    }
};
