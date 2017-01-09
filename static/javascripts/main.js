const { ipcRenderer } = require('electron');
const userhome = require('user-home');


// Request main process to give us the contents of the home directory.
ipcRenderer.send('read-path', userhome);

// Emitted when the main process have read the contents of the file system path
// that is being browsed.
ipcRenderer.on('fs-data', (e, files) => renderItems(files));


/**
 *  Render directory content items to the interface.
 *
 *  @param {Array} items A list of objects containing the path to each item and
 *    its properties.
 **/
function renderItems(items) {
  // TODO: use a templating engine to render each item template
  const container = document.querySelector('tbody');
  container.innerHTML = '';

  items.forEach(item => {
    const rendered = `
      <tr>
        <td>${item.path}</td>
        <td>${item.size}</td>
        <td>${item.mtime}</td>
      </tr>
    `;
    container.innerHTML += rendered;
  });
}
