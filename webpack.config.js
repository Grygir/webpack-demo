const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MapModulesPlugin = require('./src/map-modules-plugin');

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
    // alias: {
    //   'oroui/js/app/component/main': 'orocustom/js/app/component/ui-main'
    // }
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!modules.js'],
    }),
    new MapModulesPlugin({
      '*': {
        'oroui/js/app/component/main': 'orocustom/js/app/component/ui-main',
      },
      'bundles/orocustom/js/app/component/ui-main.js': {
        'oroui/js/app/component/main': 'oroui/js/app/component/main'
      },
      'bundles/oroui/js/app/component/main.js': {
        'oroui/js/app/views/span-with-text': 'orocustom/js/app/views/span-with-text'
      },
      'bundles/orofilters/js/app/component/test.js': {
        'oroui/js/app/views/span-with-text': 'orocustom/js/app/views/red-text'
      }
    })
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
