export default (type) => {
  const typeMap = {
    boolean: 'orofilter/js/filters/boolean',
    choice: 'orocustom/js/choice-filter',
    number: 'orofilter/js/filters/number',
    string: 'orofilter/js/filters/string',
  };
  return typeMap[type];
}
