const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (jscTransformConfiguration) => ({
  entry: './src/index.tsx',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 400 * 1024,
    },
  },
  output: {
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    filename: '[name].[chunkhash:8].js',
    library: {
      type: 'module',
    },
    publicPath: '.',
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        exclude: path.join(__dirname, 'node_modules'),
        test: /\.tsx?$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: jscTransformConfiguration,
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist', 'index.html'),
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
});
