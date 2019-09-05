export default (text) => {
  const tag = document.createElement('font');
  tag.innerHTML = `<b>${text}</b>`;
  tag.setAttribute('color', 'red');
  document.body.appendChild(tag);
  document.body.appendChild(document.createElement('br'));
}
