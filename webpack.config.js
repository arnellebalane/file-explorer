const path = require('path');
const externals = require('webpack-node-externals');


module.exports = {
    entry: path.join(__dirname, 'source', 'main.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|ttf)/,
            loader: 'file-loader',
            options: {
                name: '[path]/[name]-[hash:7].[ext]',
                publicPath: 'build/'
            }
        }]
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },

    // NOTE: I honestly haven't figured out yet why I need to whitelist vue.
    // Initially, I thought that packages in added to the "dependencies" should
    // be whitelisted, but when I tried to whitelist vuex the webpack build
    // just fails (or maybe vuex should be in "devDependencies" hmmm). Removing
    // vue from the whitelist produces a different set of errors as well.
    externals: [externals({ whitelist: ['vue'] })]
};
