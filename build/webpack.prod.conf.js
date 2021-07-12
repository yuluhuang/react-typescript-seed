const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackZipPlugin = require('webpack-zip-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');
const packageData = require('../package.json');

const env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : require('../config/production.env');

const plugins = [];
Object.keys(baseWebpackConfig.entry).forEach((name) => {
    console.log('name11', config.build[name]);
    plugins.push(
        new HtmlWebpackPlugin({
            filename: name + '.html',
            template: '../public/' + name + '.html',
            chunks: [name, 'manifest', 'vendor'],
            title: name,
            // favicon: '111',
            inject: true,
            minify: {
                minifyJS: true,
                minifyCSS: true,
                removeComments: true,
                useShortDoctype: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                // removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            append: {
                head: '<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>'
            },
            meta: {
                title: packageData.name,
                description: packageData.description,
                keywords: Array.isArray(packageData.keywords) ? packageData.keywords.join(',') : undefined
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: 'dependency'
        })
    );
});

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        // rules: utils.styleLoaders({
        //     sourceMap: config.build.productionSourceMap,
        //     extract: true,
        //     usePostCSS: true
        // })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn/,
        ),
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // extract css into its own file
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('css/[name].[contenthash].css'),
        //     // Setting the following option to `false` will not extract CSS from codesplit chunks.
        //     // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
        //     // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
        //     allChunks: true,
        // }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? {safe: true, map: {inline: false}}
                : {safe: true}
        }),

        // keep module.id stable when vendor modules does not change
        // new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        // new webpack.optimize.ModuleConcatenationPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: config.build.assetsSubDirectory,
                    // ignore: ['.*']
                }
            ]
        }),
        new WebpackZipPlugin({
            initialFile: './dist', //需要打包的文件夹(一般为dist)
            endPath: './', //打包到对应目录（一般为当前目录'./'）
            zipName: 'dist-' + process.env.NODE_ENV + '.zip' //打包生成的文件名
        }),
        new CleanWebpackPlugin(
            {
                // root: path.resolve(__dirname, '../'), //根目录
                cleanOnceBeforeBuildPatterns: ['./dist*.zip'], // 匹配删除的文件
                verbose: true, //开启在控制台输出信息
                dry: false //启用删除文件
            }
        ),
    ].concat(plugins),
    optimization: {
        splitChunks: {
            chunks: 'all', // 必须三选一： "initial" | "all" | "async" initial(初始块)、async(按需加载块)、all(全部块)，默认为async
            minSize: 30000, // 形成一个新代码块最小的体积
            minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数（译注：为保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）. must be greater than or equal 2. The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数。
            maxInitialRequests: 3, // 一个入口最大的并行请求数。
            name: true, // 名称，此选项可接收 function
            cacheGroups: {
                vendors: { // key 为entry中定义的 入口名称
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    chunks: 'initial', // //all-异步加载快，但初始下载量较大，文件共用性好； initial-初始下载量较小，但异步加载量较大，文件间有重复内容
                    filename: 'vendor.[contenthash].js',
                    reuseExistingChunk: true, // 选项用于配置在模块完全匹配时重用已有的块，而不是创建新块
                    priority: -10,
                    minChunks: 1
                },
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    name: "commons",
                    maxInitialRequests: 5,
                    minSize: 0, // 默认是30kb，minSize设置为0之后
                    // 多次引用的utility1.js和utility2.js会被压缩到commons中
                },
                reactBase: {
                    test: (module) => {
                        return /react|redux|react-dom|prop-types/.test(module.context);
                    }, // 直接使用 test 来做路径匹配，抽离react相关代码
                    chunks: "initial",
                    name: "reactBase",
                    priority: 10,
                },
                default: {
                    minChunks: 2, // 表示被引用次数，默认为1；上述配置commons中minChunks为2，表示将被多次引用的代码抽离成commons。
                    priority: -20,   // 优先级配置项
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: true,
        minimizer: [new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true
            },
            sourceMap: true
        })]
    },
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.('
                + config.build.productionGzipExtensions.join('|')
                + ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

webpackConfig.plugins.push(
    new WebpackShellPlugin({
        // onBuildStart: [''],
        onBuildEnd: ['open .']
    })
);

module.exports = webpackConfig;
