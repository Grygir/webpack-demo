export default (text) => {
  const span = document.createElement('span');
  span.innerHTML = `Loaded module: "<b>${text}</b>"`;
  document.body.appendChild(span);
  document.body.appendChild(document.createElement('br'));
}
