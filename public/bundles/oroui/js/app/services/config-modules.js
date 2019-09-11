import configs from 'configs.json';

export default function getConfig(moduleId) {
  return configs[moduleId];
};
