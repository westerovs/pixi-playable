const TerserPlugin = require("terser-webpack-plugin");

module.exports = isDev =>{
    const optim = {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],   }

    return isDev
        ?optim
        :optim
}