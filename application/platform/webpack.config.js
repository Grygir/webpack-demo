const path = require('path');
const resolve = require('enhanced-resolve');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const prepareModulesMap = require('./src/prepare-modules-map');
const MapModulesPlugin = require('./src/map-modules-plugin');
const mapConfig = require('./public/js/modules-map.json');

const bundlesDir = path.resolve(__dirname, 'public/bundles');
const jsDir = path.resolve(__dirname, 'public/js');

const resolverConfig = {
  modules: [
    path.resolve(__dirname, 'node_modules'),
    bundlesDir,
    jsDir,
  ],
  alias: {
    'config$': 'oroui/js/app/services/config-modules',
    // 'oroui/js/app/component/main': 'orocustom/js/app/component/ui-main'
  }
};

const simpleResolver = (resolver => {
  return moduleName => resolver({}, '', moduleName, {});
})(resolve.create.sync({ ...resolverConfig }));

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'oroui/js/app'
    ]
  },
  resolve: {
    ...resolverConfig,
    plugins: [
      new MapModulesPlugin(prepareModulesMap(simpleResolver, mapConfig))
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!app-modules.js',
        '!modules.js',
        '!modules-map.json',
        '!configs.json'
      ],
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
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
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
