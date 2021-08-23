
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'formatters.js',
        library: 'formatters',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        }],
    },
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        devMiddleware: {
            // writeToDisk: true,
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [`${path.join(__dirname, 'dist')}/*.hot-update.*`],
            dry: false,
            dangerouslyAllowCleanPatternsOutsideProject: true
        }),
    ],
};