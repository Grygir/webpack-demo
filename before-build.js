const fs = require('fs');
const path = require('path');
const resolve = require('enhanced-resolve');
const webpackConfig = require('./webpack.config.js');

const rawConfigs = require('./cache/configs.json');
const mappedConfigs = {};

const resolver = resolve.create.sync({...webpackConfig.resolve});

for (let [moduleName, config] of Object.entries(rawConfigs)) {
  let moduleId = './' + path.relative(__dirname, resolver({}, '', moduleName, {}));
  mappedConfigs[moduleId] = config;
}

fs.writeFileSync('./public/js/configs.json', JSON.stringify(mappedConfigs), 'utf8');
