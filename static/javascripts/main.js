const { ipcRenderer } = require('electron');
const userhome = require('user-home');


// Request main process to give us the contents of the home directory.
ipcRenderer.send('read-path', userhome);

// Emitted when the main process have read the contents of the file system path
// that is being browsed.
ipcRenderer.on('fs-data', (e, files) => console.log(files));
