import view from 'oroui/js/app/views/span-with-text';

import config from 'config';
console.log(module.id, config(module.id));

view('oroui/js/app/component/test');

export default function uiTestComponent() {}
