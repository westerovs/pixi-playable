const names = require('./components/names')
const plugins = require('./components/plugins')
const rules = require('./components/rules')
const devserver = require('./components/devserver')
const optimization = require('./components/optimization')

module.exports = isDev => {
    const {
        assetsDir,
        srcDir,
        rootDir,
        distDir,
        entry_js,
        main_style,
        output_js
    } = names(isDev)

    const source_map = isDev
        ?'eval-source-map'
        :undefined

    return {
        context: rootDir,
        devtool: source_map,
        devServer: devserver(),
        optimization: optimization(),
        entry: {
            main: entry_js
        },
        output: {
            path: distDir,
            filename: output_js
        },
        resolve: {
            // extensions:['.json','.js','.png','.jpg','.jpeg'],
            modules:['node_modules'],
            alias: {
                '@':  srcDir,
                'assets': assetsDir,
                'style': main_style
            }
        },
        plugins: plugins(isDev),
        module:{
            rules: rules(isDev)
        },
    }
}