const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const BABEL_LOADER = require.resolve('babel-loader');
const STYLE_LOADER = require.resolve('style-loader');
const CSS_LOADER = require.resolve('css-loader');
const SASS_LOADER = require.resolve('sass-loader');
const WebpackPluginImport = require('webpack-plugin-import');

const URL_LOADER = require.resolve('url-loader');
const URL_LOADER_LIMIT = 8192;

const getBabelConfig = require('../config/getBabelConfig');

module.exports = function (entry) {
    return {
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        output: {
            path: path.resolve(process.env.BUILD_DEST || './'),
            publicPath: './',
            filename: '[name].js',
        },
        entry,
        externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            moment: 'moment'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: BABEL_LOADER,
                    options: getBabelConfig(),
                },
                {
                    test: /\.css$/,
                    use: [STYLE_LOADER, CSS_LOADER],
                },
                {
                    test: /\.scss$/,
                    use: [STYLE_LOADER, CSS_LOADER, SASS_LOADER],
                },
                {
                    test: /\.svg$/,
                    loader: URL_LOADER,
                    options: {
                        limit: URL_LOADER_LIMIT,
                        minetype: 'image/svg+xml',
                        name: 'images/[hash].[ext]',
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    loader: URL_LOADER,
                    options: {
                        limit: URL_LOADER_LIMIT,
                        name: 'images/[hash].[ext]',
                    },
                }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json']
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }),
            new WebpackPluginImport([
                {
                    libraryName: /^@alife\/next\/lib\/([^/]+)/,
                    stylePath: 'style.js',
                },
            ])
        ],
    };
}
