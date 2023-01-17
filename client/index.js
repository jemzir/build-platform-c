const gitStatus = document.querySelector('#git-status');
let text = '';

fetch('db')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    text = data;
    const p = document.createElement('p');
    const txtNode = document.createTextNode(text);
    p.appendChild(txtNode);
    gitStatus.appendChild(p);
  })



