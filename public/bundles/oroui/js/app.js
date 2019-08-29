import getModule from 'oroui/js/app/services/dynamic-modules';
import filterTypeToModuleMap from 'orofilters/js/type-to-module-map';

const components = [
  'orocustom/js/app/component/main',
  'orocustom/js/app/component/text',
  'orofiltes/js/app/component/main',
  'orofiltes/js/app/component/text',
  'oroui/js/app/component/main',
  'oroui/js/app/component/text',
];

const element = document.createElement('div');
element.innerText = 'Let\'s start!';
document.body.appendChild(element);

const button = document.createElement('button');
button.innerText = 'Get random component!';
button.onclick = async () => {
  const moduleName = components[Math.floor(Math.random() * components.length)];
  const component = await getModule(moduleName);
  console.log(component);
};
document.body.insertBefore(button, element);



const getFilterType = () => {
  const types = ['boolean', 'choice', 'number', 'string'];
  return types[Math.floor(Math.random() * types.length)];
};

const button2 = document.createElement('button');
button2.innerText = 'Get random filter!';
button2.onclick = async () => {
  const filterType = getFilterType();
  const filter = await getModule(filterTypeToModuleMap(filterType));
  console.log(filter);
  element.innerText = `It's Oro! With filter: ${filter()}`;
};
document.body.appendChild(button2);
