class MapModulesPlugin {
  constructor(map) {
    this.map = map;
  }

  apply(compiler) {
    const { '*': generalMap, ...customMap } = this.map;
    const customMapKeys = Object.keys(customMap);

    compiler.resolverFactory.plugin('resolver normal', resolver => {
      const source = resolver.ensureHook('before-resolve');
      const target = resolver.ensureHook('resolve');

      resolver.getHook(source).tapAsync('MapModulesPlugin', (request, resolveContext, callback) => {
        const innerRequest = request.request || request.path;
        const issuer = request.context.issuer;
        if (!innerRequest || !issuer) {
          return callback();
        }
        const mapKey = customMapKeys.find(name => issuer.slice(-name.length) === name);
        const map = mapKey ? customMap[mapKey] : generalMap || {};

        for (const [name, alias] of Object.entries(map)) {
          if (innerRequest === alias) {
            return callback();
          }
          if (innerRequest === name) {
            const obj = {...request, request: alias};
            const msg = `aliased with mapping "${name}": "${alias}"`;
            return resolver.doResolve(target, obj, msg, resolveContext, (err, result) => {
              if(err) {
                return callback(err);
              }

              // Don't allow other aliasing or raw request
              if(result === undefined) {
                return callback(null, null);
              }
              callback(null, result);
            });
          }
        }

        return callback();
      });
    });
  }
}

module.exports = MapModulesPlugin;
