const resolve = require('path').resolve

module.exports = isDev => {
    const dirname = (path) => resolve(__dirname, '../..', path)
    const dirs = {
        rootDir  : dirname(''),
        srcDir   : dirname('src'),
        assetsDir: dirname('assets'),
        distDir  : dirname('dist'),
        moduleDir: dirname('node_modules/html5-mahjong'),
        customDir: dirname
    }
    const names = {
        entry_js: resolve(dirs.rootDir, 'index.js'),
        template: resolve(dirs.rootDir, 'index.html'),
        main_style: resolve(dirs.rootDir, 'styles.css'),
        any_file:   '[name].[ext]'
    }

    return isDev
        ?{
            ...dirs,
            ...names,
            output_js: './[name].build.js'
        }
        :{
            ...dirs,
            ...names,
            output_js: './[name].[contenthash:7].build.js'
        }
}
