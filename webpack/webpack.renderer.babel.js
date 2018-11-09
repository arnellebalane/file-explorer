import VueLoaderPlugin from 'vue-loader/lib/plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
    configureOutput,
    configureMode,
    configureVueLoader,
    configureJavascriptLoader,
    configureCssLoader,
    configureFileLoader,
    configureExternals
} from './webpack.commons.babel';

export default {
    entry: './source/index.renderer.js',
    output: configureOutput('index.renderer.js'),
    mode: configureMode(),
    module: {
        rules: [
            configureVueLoader(),
            configureJavascriptLoader(),
            configureCssLoader(),
            configureFileLoader()
        ]
    },
    externals: configureExternals(),
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './source/index.html',
            filename: 'index.html'
        })
    ]
};
