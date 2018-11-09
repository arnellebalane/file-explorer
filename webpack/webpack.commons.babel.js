import path from 'path';
import nodeExternals from 'webpack-node-externals';

export function configureOutput(filename) {
    return {
        path: path.resolve(__dirname, '../build'),
        filename
    };
}

export function configureMode() {
    return process.env.NODE_ENV || 'development';
}

export function configureVueLoader() {
    return {
        test: /\.vue$/,
        loader: 'vue-loader'
    };
}

export function configureJavascriptLoader() {
    return {
        test: /\.js$/,
        loader: 'babel-loader'
    };
}

export function configureCssLoader() {
    return {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    };
}

export function configureFileLoader() {
    return {
        test: /\.(png|jpe?g|gif|svg|eot|woff2?|ttf)$/,
        loader: 'file-loader',
        options: {
            name: 'assets/[name].[hash:7].[ext]'
        }
    };
}

export function configureExternals() {
    return [nodeExternals()];
}
