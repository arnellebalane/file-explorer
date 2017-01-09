const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

// Keep a global reference to the window object, otherwise it will get closed
// once the object gets garbage collected.
let window;


// Emitted when Electron has finished initialization and is now ready to
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


// Emitted when the renderer process requests for a path's contents to be read.
ipcMain.on('read-path', (e, path) => {
  readPathContents(path).then(files => e.sender.send('fs-data', files));
});


/**
 *  Initialize the app's browser window and manages its lifecycle.
 **/
function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true
  });
  window.loadURL(`file://${__dirname}/index.html`);

  window.webContents.openDevTools();

  // Dereference the window object so that it may be garbage collected.
  window.on('closed', _ => window = null);
}


/**
 *  Read the contents of a given directory.
 *  @param {String} dirpath The path to the directory to be read.
 *  @return A Promise object that resolves to a list of items contained in the
 *    requested directory, including their properties.
 **/
function readPathContents(dirpath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirpath, handled(files => {
      Promise.all(files.map(file => {
        const itempath = path.join(dirpath, file);
        return getItemProperties(itempath).then(item => {
          item.path = itempath;
          return item;
        });
      })).then(resolve);
    }));
  });
}


/**
 *  Get the properties of an item at the given path using `fs.stat`.
 *
 *  @param {String} itempath The path to the item whose properties will be
 *    retrieved.
 *  @return An Promise object that resolves to a `fs.Stat` object representing
 *    the item's properties.
 **/
function getItemProperties(itempath) {
  return new Promise((resolve, reject) => {
    fs.stat(itempath, handled(stats => resolve({
      size: stats.size,
      mtime: stats.mtime
    })));
  });
}


/**
 *  Wrap a given callback function and only call it when there are no errors
 *  passed to the error-first callback style.
 *  @param {Function} callback - The callback function to wrap with
 *    error-checking logic.
 *  @return A function that wraps the callback function with error-checking
 *    logic.
 **/
function handled(callback) {
  return function handledCallback(err) {
    if (err) {
      throw err;
    }
    const args = Array.prototype.slice.call(arguments, 1);
    callback.apply(null, args);
  };
}
