import path from 'path';
import externals from 'webpack-node-externals';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './source/index.renderer.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash:7].js'
    },

    mode: process.env.NODE_ENV || 'development',

    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|ttf)/,
            loader: 'file-loader',
            options: {
                name: '[path]/[name].[hash:7].[ext]'
            }
        }]
    },

    /*
     * NOTE: I honestly haven't figured out yet why I need to whitelist vue.
     * Initially, I thought that packages in added to the "dependencies" should
     * be whitelisted, but when I tried to whitelist vuex the webpack build
     * just fails (or maybe vuex should be in "devDependencies" hmmm). Removing
     * vue from the whitelist produces a different set of errors as well.
     */
    externals: [externals()],

    plugins: [
        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            template: './source/index.html',
            filename: 'index.html'
        })
    ]
};
