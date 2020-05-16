const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const { ModuleFederationPlugin } = webpack.container

module.exports = ({ mode }) => ({
    mode,
    optimization: {
        runtimeChunk: false
    },
    entry: './src/index.js',
    output: {
        filename: '[name].buttons.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:5000/'
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        esmodules: true
                                    },
                                    useBuiltIns: 'usage'
                                }
                            ]
                        ],
                        plugins: []
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 5000,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('1.0.0'),
            'process.env.NODE_ENV': JSON.stringify(mode)
        }),
        new ModuleFederationPlugin({
            name: 'components',
            library: { type: 'var', name: 'components' },
            filename: 'remoteEntry.js',
            exposes: {
                redButton: './src/components/redButton',
                greenButton: './src/components/greenButton'
            },
            // Other optimizations: 
            // shared: [ 'react', 'react-dom' ]
        })
    ]
})