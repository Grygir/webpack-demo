export default (type) => {
  const typeMap = {
    boolean: 'orofilters/js/filters/boolean',
    choice: 'orocustom/js/choice-filter',
    number: 'orofilters/js/filters/number',
    string: 'orofilters/js/filters/string',
  };
  return typeMap[type];
}
