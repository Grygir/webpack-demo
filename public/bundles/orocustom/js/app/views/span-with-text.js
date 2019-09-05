export default (text) => {
  const span = document.createElement('span');
  span.innerHTML = `<b>${text}</b>`;
  document.body.appendChild(span);
  document.body.appendChild(document.createElement('br'));
}
