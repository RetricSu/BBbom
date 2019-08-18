/*
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-07 15:42:24
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-18 11:53:58
 */
import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Tray
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
    //mainWindow.webContents.openDevTools()

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

  //app.on('ready', createWindow)
  app.on('ready', () => {
    createWindow();
    setTray();
  })

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


  function listen() {
    // In main process.
    ipcMain.on('open-setting-page', (event, arg) => {
      openSettingWindow();
    })
  }
  
  function openSettingWindow(){
    const modalPath = process.env.NODE_ENV === 'development' ?
        `http://localhost:9080/#/setting` :
        `file://${__dirname}/index.html#setting`
      //console.log(modalPath)
      const win = new BrowserWindow({
        width: 400,
        height: 800,
        frame: false
      });
      win.loadURL(modalPath);
  }



  function setTray() {
    //const nativeImage = require('electron').nativeImage
    const iconPath = require('path').join(__dirname, 'bitcoin.png')
    //let image = nativeImage.createFromPath(iconPath);

    let tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '打开',
        click: function () {
          //app.show();
          BrowserWindow.getAllWindows().forEach(w => w.show());
        }
      },
      {
        label: '设置',
        click: function () {
          openSettingWindow();
        }
      },
      {
        label: '退出',
        click: function () {
          app.quit();
        }
      }

    ]);
    tray.setToolTip('BBbom');
    tray.setTitle('BBbom');
    tray.setContextMenu(contextMenu);

    ipcMain.on('set-new-price-on-tray', (event, price) => {
      tray.setTitle(price);
      tray.setToolTip(price);
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