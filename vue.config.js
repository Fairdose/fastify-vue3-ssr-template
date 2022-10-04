const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')

exports.chainWebpack = (config) => {
    if (process.env.SSR) {

        config.entry('app').clear().add('./src/main.js')
        config.target('node'),
        config.output.libraryTarget('commonjs2')
    
        config.plugin('manifest').use(
            new WebpackManifestPlugin(
                { fileName: 'ssr-manifest.json' }
                )
            )
    
        config.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }))
    
        config.optimization.splitChunks(false).minimize(false)
    }
}