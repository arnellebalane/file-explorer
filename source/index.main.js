/* eslint-disable no-use-before-define */
import fs from 'fs';
import path from 'path';
import trash from 'trash';
import mkdirp from 'mkdirp';
import {app, BrowserWindow, ipcMain} from 'electron';

let browserWindow;

app.on('ready', createWindow);

app.on('windows-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!browserWindow) {
        createWindow();
    }
});

function createWindow() {
    browserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true
    });
    browserWindow.loadURL(`file://${__dirname}/index.html`);

    // Dereference the window object so that it may be garbage collected.
    browserWindow.on('closed', () => (browserWindow = null));
}

/**
 *  Emitted when the renderer process requests for a path's contents to be
 *  read. Contents are sorted alphabetically, but placing directories first.
 *  @param {String} directoryPath The path to the directory to be read.
 */
ipcMain.on('read-path', (e, directoryPath) => {
    readPathContents(directoryPath)
        .then(sortItemsDirectoriesFirst)
        .then(files => e.sender.send('fs-data', files));
});

/**
 *  Emitted when the renderer process requests for items to be deleted. Asks
 *  for confirmation first before actually deleting the items.
 *  @param {Array} items The absolute paths of the items to be deleted.
 */
ipcMain.on('delete-items', (e, items) => {
    trash(items)
        .then(() => e.sender.send('delete-status', true))
        .catch(() => e.sender.send('delete-status', false));
});


/**
 *  Request for a new directory to be created.
 *  @param {String} directoryPath The absolute path to the directory that is
 *      going to be created.
 */
ipcMain.on('create-directory', (e, directoryPath) => {
    createDirectory(directoryPath)
        .then(() => e.sender.send('create-directory-response', true))
        .catch(error => e.sender.send('create-directory-response', error));
});

/**
 *  Read the contents of a given directory.
 *  @param {String} dirpath The path to the directory to be read.
 *  @return A Promise object that resolves to a list of items contained in the
 *    requested directory, including their properties.
 */
function readPathContents(dirpath) {
    return new Promise(resolve => {
        fs.readdir(dirpath, handled(files => {
            Promise.all(files.map(file => {
                const itemPath = path.join(dirpath, file);
                return getItemProperties(itemPath);
            })).then(resolve);
        }));
    });
}

/**
 *  Get the properties of an item at the given path using `fs.stat`.
 *
 *  @param {String} itemPath The path to the item whose properties will be
 *    retrieved.
 *  @return An Promise object that resolves to a `fs.Stat` object representing
 *    the item's properties.
 */
function getItemProperties(itemPath) {
    return new Promise(resolve => {
        fs.stat(itemPath, handled(stats => resolve({
            name: itemPath.split('/').pop(),
            type: getItemType(stats),
            path: itemPath,
            size: stats.size,
            mtime: stats.mtime
        })));
    });
}

/**
 *  Get the item type (directory, file, etc.) from a given `fs.Stat` object.
 *
 *  @param {fs.Stat} item The `fs.Stat` object corresponding to an item.
 *  @return A String representing what type the item is.
 */
function getItemType(item) {
    if (item.isFile()) {
        return 'file';
    } else if (item.isDirectory()) {
        return 'directory';
    } else if (item.isBlockDevice()) {
        return 'blockdevice';
    } else if (item.isCharacterDevice()) {
        return 'characterdevice';
    } else if (item.isSymbolicLink()) {
        return 'symlink';
    } else if (item.isFIFO()) {
        return 'fifo';
    } else if (item.isSocket()) {
        return 'socket';
    }
    return '';
}

/**
 *  Sorts the items alphabetically, but placing the directories before the
 *  other types of items.
 *
 *  @param {Array} items The array of items to be sorted.
 *  @return The sorted array of items.
 */
function sortItemsDirectoriesFirst(items) {
    return items.sort((a, b) => {
        if ((a.type === 'directory' && b.type === 'directory')
        || (a.type !== 'directory' && b.type !== 'directory')) {
            return compare(
                a.name.replace(/^\./, '').toLowerCase(),
                b.name.replace(/^\./, '').toLowerCase()
            );
        } else if (a.type === 'directory') {
            return -1;
        } else if (b.type === 'directory') {
            return 1;
        }
        return 0;
    });
}

/**
 *  @param {String} directoryPath The absolute path to the directory that is
 *      going to be created.
 */
function createDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
        mkdirp(directoryPath, 0o775, (err, made) => {
            if (err) {
                return reject(err);
            } else if (!made) {
                return reject({code: 'EEXIST'});
            }
            return resolve();
        });
    });
}

/**
 *  Compare the two given arguments, to be used as comparator for sorting.
 *
 *  @param {Number|String} a, b The objects to be compared.
 *  @return A Number (-1, 0, 1) representing the sort order of the arguments.
 */
function compare(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

/**
 *  Wrap a given callback function and only call it when there are no errors
 *  passed to the error-first callback style.
 *  @param {Function} callback - The callback function to wrap with
 *    error-checking logic.
 *  @return A function that wraps the callback function with error-checking
 *    logic.
 */
function handled(callback) {
    return function handledCallback(err, ...args) {
        if (err) {
            throw err;
        }
        callback(...args);
    };
}
