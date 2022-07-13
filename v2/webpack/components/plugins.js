const names = require('./names')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

module.exports = isDev =>{
    const {template} = names(isDev)

    const plugins = [
        new HtmlWebpackPlugin({
            template,
            filename: 'index.html',
            inject: true,
            minify: {
                html5                : true,
                minifyCSS            : true,
                minifyJS             : true,
                minifyURLs           : false,
                collapseWhitespace   : true,
                removeComments       : true,
                removeAttributeQuotes: false,
                removeEmptyAttributes: false,
            },
        }),
        new CleanWebpackPlugin(),
    ]
    const devPlugins = [
        // new CopyPlugin({
        //     patterns: [
        //         { from: './src/assets', to: './assets' }
        //     ]
        // }),
    ]
    const prodPlugins = [
        // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/build(?=.js)/g])
    ]

    return isDev
        ?[...plugins, ...devPlugins]
        :[...plugins, ...prodPlugins]
}