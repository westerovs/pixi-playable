const build = require('./webpack/index')

module.exports = (_, options) => {
    const mode = options.mode ?? "development"
    console.log(`Configuration for mode ${mode.toUpperCase()} started` )
    return build(mode === 'development')
}