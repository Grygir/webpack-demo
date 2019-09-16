import staticConfig from 'configs.json';

let config;
const moduleNameMask = /^\.\/public\/bundles\/([\w\W]+)\.js$/;

export default (moduleId) => {
  // if (!config) {
  //   config = mergeConfig({}, staticConfig);
  //   config = mergeConfig(config, fetchConfigExtends());
  // }
  // let moduleName = fetchModuleName(moduleId);
  // return config[moduleName];
  return {};
};

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

/**
 * Converts moduleId to moduleName
 *
 * @param moduleId
 * @return {string | *}
 */
function fetchModuleName(moduleId) {
  let matches = moduleId.match(moduleNameMask);
  if (!matches) {
    console.warn(`Can\'t fetch module name from the module id "${moduleId}"`);
  }
  return matches[1];
}
