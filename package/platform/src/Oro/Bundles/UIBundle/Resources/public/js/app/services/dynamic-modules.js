import _ from 'underscore';
import modules from 'modules';

export default async function getModule(name, ...values) {
  let module = await modules[name]();
  return values.length === 0 ? module.default : _.pick(module, values);
};
