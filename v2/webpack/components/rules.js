module.exports = isDev => {

    const rules = [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test   : /\.js$/,
            use    : ['babel-loader'],
            exclude: /(node_modules)/,
        },
        {
            test   : /\.(jpe?g|png|mp3)$/,
            loader : 'base64-inline-loader',
            options: {
              name: '[name].[ext]',
            },
        },
    ]

    return isDev
        ?[...rules]
        :[...rules]
}