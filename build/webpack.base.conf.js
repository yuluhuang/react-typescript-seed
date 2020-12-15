const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const utils = require('./utils');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const isProduction = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'pretest');

const createLintingRule = () => ({
    test: /(\.ts|\.tsx)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});
console.log('context', path.resolve(__dirname), path.resolve(__dirname, '../src/'));
module.exports = {
    context: resolve('src'),
    entry: {
        index: './index.tsx',
    },
    output: {
        path: config.build.assetsRoot,
        // filename: '[name].js',
        filename: isProduction ? '[contenthash].js' : '[hash].js',
        chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js',
        publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
        mainFields: ['module', 'browser', 'main'],
        alias: {
            app: resolve('src/app'),
            '~': resolve('src')
        }
    },
    performance: {
        maxEntrypointSize: 1200000,
        maxAssetSize: 400000,
        hints: isProduction ? 'warning' : false
    },
    plugins: [
        // new webpack.EnvironmentPlugin({
        //     NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        //     DEBUG: false
        // }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            ENV: path.resolve(__dirname, '../config/'  + process.env.NODE_ENV + '.env.js')
        }),
        new MiniCssExtractPlugin({
            filename: '[hash].css',
            disable: !isProduction
        }),
    ],
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    'cache-loader',
                    !isProduction && {
                        loader: 'babel-loader',
                        options: {plugins: ['react-hot-loader/babel']}
                    },
                    'ts-loader'
                ].filter(Boolean)
            },
            // css
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            sourceMap: !isProduction,
                            importLoaders: 1,
                            modules: {
                                localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-import')({addDependencyTo: webpack}),
                                require('postcss-url')(),
                                require('postcss-preset-env')({
                                    /* use stage 2 features (defaults) */
                                    stage: 2
                                }),
                                require('postcss-reporter')(),
                                require('postcss-browser-reporter')({
                                    disabled: isProduction
                                })
                            ]
                        }
                    }
                ]
            },
            // static assets
            {test: /\.html$/, use: 'html-loader'},
            {
                test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
