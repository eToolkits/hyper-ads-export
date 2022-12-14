const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require('path');
require("@electron/remote/main").initialize();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true,
    autoHideMenuBar: true,
    title: "Hyper Ads Export",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      nativeWindowOpen: true
    },
  });
  win.maximize();
  if (isDev) {
    win.webContents.openDevTools();
  }
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`, { userAgent: 'Chrome' }
  );
}

app.on("ready", createWindow);
app.userAgentFallback = app.userAgentFallback.replace('Electron/' + process.versions.electron, '');
// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
  // if (process.platform !== "darwin") {
  // }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
