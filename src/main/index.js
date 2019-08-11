/*
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-07 15:42:24
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-11 16:36:38
 */
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 400,
    height: 140,
    webPreferences: {
      webSecurity: false
    },
    //backgroundColor:'black',
    //backgroundColor: "gray",
    transparent: true,
    //vibrancy: 'ultra-dark',
    frame: false,
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  
  // make the app always-on-top and overlap
  app.dock.hide();
  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  //mainWindow.setOpacity (0.5);
  //mainWindow.setIgnoreMouseEvents(true)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready',createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

listen();


function listen(){
    // In main process.
ipcMain.on('open-setting-page', (event, arg) => {
  const modalPath = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080/#/setting` :
    `file://${__dirname}/index.html#setting`
  //console.log(modalPath)
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    frame:false
  });
  win.loadURL(modalPath);
})
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */