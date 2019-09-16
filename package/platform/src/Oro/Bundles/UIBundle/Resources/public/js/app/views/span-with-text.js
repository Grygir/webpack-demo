export default (text) => {
  const span = document.createElement('span');
  span.innerText = `Loaded module: "${text}"`;
  document.body.appendChild(span);
  document.body.appendChild(document.createElement('br'));
}
