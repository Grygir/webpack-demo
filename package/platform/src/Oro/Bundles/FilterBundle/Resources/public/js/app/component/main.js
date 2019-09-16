import view from 'oroui/js/app/views/span-with-text';

import config from 'config';
console.log(module.id, config(module.id));

view('orofilter/js/app/component/main');

export default function filtersMainComponent() {}
