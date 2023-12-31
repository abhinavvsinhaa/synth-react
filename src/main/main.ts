/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import fs from 'fs';
import { OpenedFileDetails } from '../renderer/typings/files';
// import { runCommand } from './services';
import { spawn, exec } from 'child_process';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const generateFileDataFromPath = (filePath: string, data: string) => {
  const dotSplitArr = filePath.split('.');
  const slashSplitArr = filePath.split('/');
  const fileExtension = dotSplitArr[dotSplitArr.length - 1];
  const fileName = slashSplitArr[slashSplitArr.length - 1];
  const fileData: OpenedFileDetails = {
    path: filePath,
    data: data,
    fileName,
    fileExtension
  };
  return fileData;
};

ipcMain.on('compileAndRun', async (event: Electron.IpcMainEvent, props: {
  filePath: string,
  inputData: string
}) => {
  exec(`g++ ${props.filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      event.reply('compilationStatus', new TextEncoder().encode(error.message));
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      event.reply('compilationStatus', new TextEncoder().encode(stderr)); // TODO: listen it for compilation status
      return;
    } else {
      event.reply('compilationStatus', new TextEncoder().encode('Compilation Success'));
    }

    const child = spawn('./a.out');
    child.stdin.write(props.inputData); // TODO: pass here whatever taken from user from CT tab
    child.stdin.end();

    child.stdout.on('data', (data) => {
      console.log(`child stdout:\n${data}`);
      event.reply('scriptExecuted', data); // TODO: listen it for successful execution and output of the script
    });
  });
});

// ipcMain.on('execute', async (event: Electron.IpcMainEvent) => {
//   const child = spawn('g++', ['-std=c++14', '~/Desktop/hello.cpp'])

//   child.stdout.on('data', data => {
//     console.log('data:', data);
//     event.reply('onExecuted', data)
//   })

//   child.stderr.on('error', error => {
//     console.log('error:', error);
//   })
// })

// ipcMain.on('run', async (event: Electron.IpcMainEvent) => {
//   const child = spawn('~/Desktop/hello', { stdio: ['pipe', 'pipe', 'pipe'] })

// //  child.stdin.write('4')

//   child.stdout.on('data', data => {
//     console.log('data:', data);
//     event.reply('onRan', data)
//   })

//   child.stderr.on('error', error => {
//     console.log('error:', error);
//   })
// })

const handleOpenDialog = async (event: Electron.IpcMainEvent) => {
  // Open a file dialog when "Open" is clicked
  const result = await dialog.showOpenDialog({
    properties: ['openFile']
  });
  if (!result.canceled) {
    // Handle the selected file here
    const filePath = result.filePaths[0];
    // Perform operations with the selected file
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {

      } else {
        const fileData = generateFileDataFromPath(filePath, data);
        event.reply('on-file-open', fileData);
      }
    });
  }
};
ipcMain.on('showOpenDialog', async (event) => {
  await handleOpenDialog(event);
});

const handleSaveDialog = async (event: Electron.IpcMainEvent) => {
  const file = await dialog.showSaveDialog({
    title: 'Select the File Path to save',
    defaultPath: path.join(__dirname),
    // defaultPath: path.join(__dirname, '../assets/'),
    buttonLabel: 'Save',
    // Restricting the user to only Text Files.
    properties: []
  });
  if (!file.canceled) {
    const filePath = file.filePath;
    if (filePath) {
      const fileData = generateFileDataFromPath(filePath.toString(), '');
      event.reply('on-file-open', fileData);
    } else {
      //TODO: Error handler
    }
  }
};

ipcMain.on('showSaveDialog', async (event) => {
  await handleSaveDialog(event);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    fullscreen: true,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js')
    }
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
