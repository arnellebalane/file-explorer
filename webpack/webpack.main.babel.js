import {
    configureOutput,
    configureMode,
    configureJavascriptLoader,
    configureExternals
} from './webpack.commons.babel';

export default {
    entry: './source/index.main.js',
    output: configureOutput('index.main.js'),
    target: 'node',
    mode: configureMode(),
    module: {
        rules: [
            configureJavascriptLoader()
        ]
    },
    externals: configureExternals(),
    node: {
        __dirname: false
    }
};
