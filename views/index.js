const gitStatus = document.querySelector('#git-status');
const getBtn = document.querySelector('#get-db');
let text = '';

function clickHandler() {
  fetch('db', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    text = data;
    const p = document.createElement('p');
    const txtNode = document.createTextNode(text);
    p.appendChild(txtNode);
    gitStatus.appendChild(p);
  })
}

getBtn.onclick = clickHandler;

/**
 * shortcut here is that button will create duplicates
 * could configure it by having a refresh functionality/ clear and then repopulate the text
 */




