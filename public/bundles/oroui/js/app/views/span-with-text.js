export default (text) => {
  const span = document.createElement('span');
  span.innerText = text;
  document.body.appendChild(span);
  document.body.appendChild(document.createElement('br'));
}
