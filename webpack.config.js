// todo: es6 imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const jshintStylish = require('jshint-stylish');

module.exports = {
    entry: './book/scripts/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            shCore: require.resolve('./book/scripts/vendor/syntaxhighlighter/shCore'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: [/node_modules/, /vendor/],
                use: {
                    loader: 'jshint-loader',
                    options: {
                        reporter: jshintStylish,
                    },
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'link:href'],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: 'file-loader',
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                }),
            },
            // using imports-loader for all of these modules since they can't decide
            // which interface to use to mutate syntaxhighlighter
            {
                test: require.resolve('./book/scripts/vendor/codecode/codecode'),
                use: [
                    'imports-loader?jQuery=jquery,SyntaxHighlighter=shCore',
                ],
            },
            {
                test: require.resolve('./book/scripts/vendor/syntaxhighlighter/shCore'),
                use: [
                    'exports-loader?SyntaxHighlighter',
                ],
            },
            {
                test: require.resolve('./book/scripts/vendor/syntaxhighlighter/shBrushJScript'),
                use: [
                    'imports-loader?SyntaxHighlighter=shCore',
                ],
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: 'book/index.html',
        }),
        new UglifyJSPlugin(),
    ],
};
