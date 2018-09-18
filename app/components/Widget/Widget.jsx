const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const ipcMain = require('electron').remote.ipcMain;
const path = require('path')
const url = require('url')

let win;

export function openWidget(time) {
  let displays = electron.screen.getAllDisplays();
  win = new BrowserWindow({
    alwaysOnTop: true,
    height: 100,
    width: 200,
    frame: false,
    x: displays[0].bounds.width - 200,
    y: displays[0].bounds.height - 40 - 100
  });

  win.webContents.once('dom-ready', () => {
    win.webContents.send('ready', time);
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'components/Widget/render.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.once('ready-to-show', () => win.show());
  win.on('closed', () => win = null);
}

export function closeWidget() {
  win.close()
}

export function sendTime(time) {
  win && win.webContents.send('time', time);
}