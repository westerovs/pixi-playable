module.exports = () => {
    return {
        port:1234,
        client: {
            logging: 'error',
        },
        compress: true,
        hot: false,
        liveReload: true,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true
        }
    }
}