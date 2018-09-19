const electron = require("electron");
/** Import BrowserWindown to open new window. */
const BrowserWindow = electron.remote.BrowserWindow;
const path = require('path')
const url = require('url')

let win;

/** Method to Open widget (events handling to open/close) */
export function openWidget(time, isOn) {
  /** To get width, height from electron. */
  let displays = electron.screen.getAllDisplays();
  /** Make a instance of Browser Window to open widget. */
  win = new BrowserWindow({
    alwaysOnTop: true,
    height: 100,
    width: 200,
    frame: false,
    x: displays[0].bounds.width - 200,
    y: displays[0].bounds.height - 40 - 100
  });

  /** Load url event. */
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'components/Widget/render.html'),
    protocol: 'file:',
    slashes: true
  }));

  /** Send time to ready event to start timer in widget. */
  win.webContents.once('dom-ready', () => {
    win.webContents.send('ready', { time: time, isOn: isOn });
  })

  /** Event to show widget */
  win.once('ready-to-show', () => win.show());
  /** Event after close widget */
  win.on('closed', () => win = null);
}

/** Method to Close widget. */
export function closeWidget() {
  win.close()
}

/** Method to send data to widget. */
export function sendTime(time, isOn) {
  win && win.webContents.send('time', { time: time, isOn: isOn });
}