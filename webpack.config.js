const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const bundlesDir =  path.resolve(__dirname, 'public/bundles');
const jsDir =  path.resolve(__dirname, 'public/js');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'oroui/js/app'
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      bundlesDir,
      jsDir,
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!modules.js'],
    }),
  ],
  output: {
    publicPath: './js/',
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, './public/js'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          minSize: 30,
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader',
      }
    ]
  }
};
