import getModule from 'oroui/js/app/services/dynamic-modules';
import filterTypeToModuleMap from 'orofilters/js/type-to-module-map';
import 'app-modules';

import config from 'config';
console.log(module.id, config(module.id));


const getFilterType = () => {
  const types = ['boolean', 'choice', 'number', 'string'];
  return types[Math.floor(Math.random() * types.length)];
};
const loadedFilterSpan = document.createElement('span');
loadedFilterSpan.innerText = 'Let\'s start!';
const getFilterButton = document.createElement('button');
getFilterButton.innerText = 'Get random filter!';
getFilterButton.onclick = async () => {
  const filterModuleName = filterTypeToModuleMap(getFilterType());
  const filter = await getModule(filterModuleName);
  console.log(filter);
  loadedFilterSpan.innerHTML = `It's filter: "<b>${filter()}</b>" from "<b>${filterModuleName}</b>" module`;
};
document.body.appendChild(getFilterButton);
document.body.appendChild(loadedFilterSpan);
document.body.appendChild(document.createElement('hr'));



const components = [
  'orocustom/js/app/component/main',
  'orocustom/js/app/component/test',
  'orofilters/js/app/component/main',
  'orofilters/js/app/component/test',
  'oroui/js/app/component/main',
  'oroui/js/app/component/test',
];
const getComponentButton = document.createElement('button');
getComponentButton.innerText = 'Get random component!';
getComponentButton.onclick = async () => {
  const moduleName = components[Math.floor(Math.random() * components.length)];
  const component = await getModule(moduleName);
  console.log(component);
};
document.body.appendChild(getComponentButton);
document.body.appendChild(document.createElement('br'));
