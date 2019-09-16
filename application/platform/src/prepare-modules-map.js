module.exports = (simpleResolver, mapConfig) => {
  const { '*': generalMap, ...customMap } = mapConfig;

  return {
    '*': generalMap || {},
    ...Object.fromEntries(Object.entries(customMap)
      .map(([moduleName, map]) => [simpleResolver(moduleName),map]))
  };
};
