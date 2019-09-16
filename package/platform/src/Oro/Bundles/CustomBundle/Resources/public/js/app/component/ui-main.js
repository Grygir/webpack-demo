import view from 'oroui/js/app/views/span-with-text';
import uiMainComponent from 'oroui/js/app/component/main';

import config from 'config';
console.log(module.id, config(module.id));

console.log(uiMainComponent);
view('orocustom/js/app/component/ui-main');

export default function customUIMainComponent() {}
