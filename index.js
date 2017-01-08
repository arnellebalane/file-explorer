const { app, BrowserWindow } = require('electron');

// Keep a global reference to the window object, otherwise it will get closed
// once the object gets garbage collected.
let window;


function createWindow() {
  window = new BrowserWindow({ width: 800, height: 600 });
  window.loadURL(`file://${__dirname}/index.html`);

  // Dereference the window object so that it may be garbage collected.
  window.on('closed', _ => window = null);
}


// Emitted when Electron has finished initialization and is not ready to
// create windows.
app.on('ready', createWindow);

// Quit app when all windows are closed.
app.on('windows-all-closed', _ => {
  // On macOS it is common for the apps and their menu bar to stay active until
  // the user explicitly quits them.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// macOS only, emitted when the app's dock icon is clicked. On macOS it is
// common to recreate the app window when the dock icon is clicked and there
// are no other windows open.
app.on('activate', _ => {
  if (!window) {
    createWindow();
  }
});
