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
    externals: [externals({ whitelist: ['vue'] })]
};
