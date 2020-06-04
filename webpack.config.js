var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Directory for deployed assets. It should be within our static files path.
// Backslash at the end is not required.
var distDir = '/static/dist';
const isProd = process.env.NODE_ENV === 'production';
const outputPath = path.resolve(__dirname, "." + distDir + "/");

module.exports = {
  entry: ['./frontend/main.js'],
  output: {
    path: outputPath,
    filename: '[name]-[hash].js',
    publicPath: distDir + '/',
  },
  plugins: [
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      API_ROOT: JSON.stringify(
        isProd
          ? 'http://ccrcc.cptac-data-view.org'
          : 'http://127.0.0.1:8000'
      ),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          esModule: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'css-loader'
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
  },
  devServer: {
    port: 8080,
    compress: true,
    hot: true,
    contentBase: outputPath,
    writeToDisk: true
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
};

