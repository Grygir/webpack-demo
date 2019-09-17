import staticConfig from 'configs.json';

let config;

export default (moduleId) => {
  if (!config) {
    config = combineConfig();
  }
  return config[moduleId];
};

/**
 * Combines config by from statically defined part and
 * config extends defined within page HTML
 *
 * @return {Object}
 */
function combineConfig() {
  const config = mergeConfig({}, staticConfig);
  // makes temp config mep where keys are module names but values are same config options
  const tempConfig = Object.fromEntries(Object.values(config).map(moduleConfig => {
    const { __moduleName: moduleName } = moduleConfig;
    delete moduleConfig.__moduleName;
    return [moduleName, moduleConfig];
  }));
  mergeConfig(tempConfig, fetchConfigExtends());
  return config;
}

/**
 * Merges objects recursively,
 * arrays are treated as scalars -- previous values gets overwritten
 *
 * @param {Object} config
 * @param {Object} update
 * @return {Object}
 */
function mergeConfig(config, update) {
  for (let propName in update) {
    if (!update.hasOwnProperty(propName)) {
      continue;
    }
    if (update[propName] != null && update[propName].toString() === '[object Object]') {
      if (!config[propName]) {
        config[propName] = {};
      }
      mergeConfig(config[propName], update[propName]);
    } else {
      config[propName] = update[propName];
    }
  }

  return config;
}

/**
 * Fetches config defined in HTML
 *
 * @return {Object}
 */
function fetchConfigExtends() {
  const configExtends = {};
  const selector = 'script[type="application/json"][data-role="config"]';
  const nodes = document.querySelectorAll(selector);

  Array.prototype.forEach.call(nodes, (node) => {
    let configItem;
    try {
      configItem = JSON.parse(node.text);
    } catch (e) {
      console.warn('Ignored invalid inline config extend');
    }

    mergeConfig(configExtends, configItem);
  });

  return configExtends;
}
