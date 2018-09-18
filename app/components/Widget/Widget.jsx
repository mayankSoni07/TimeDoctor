const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const ipcMain = require('electron').remote.ipcMain;
const path = require('path')
const url = require('url')

let win;

export function openWidget() {

  ipcMain.on('reply', (event, data) => {
    console.log("reply", event, data)
  })

  let displays = electron.screen.getAllDisplays();
  win = new BrowserWindow({
    alwaysOnTop: true,
    backgroundColor: 'red',
    height: 50,
    width: 100,
    frame: false,
    x: displays[0].bounds.width - 100,
    y: displays[0].bounds.height - 90
  });

  win.webContents.once('dom-ready', () => {
    win.webContents.send('ready', "Data to send");
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'components/Widget/render.html'),
    protocol: 'file:',
    slashes: true
  })
  );

  win.once('ready-to-show', () => win.show());
  win.on('closed', () => win = null);
}

export function closeWidget () {
  win.close()
}
