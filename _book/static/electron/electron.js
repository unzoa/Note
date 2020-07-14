const {
  app,
  BrowserWindow,
  ipcMain: ipc,
  dialog,
  Menu
} = require('electron')
const path = require('path')
const url = require('url')
const exec = require('child_process').exec

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
function createWindow () {
  // Create the browser window.
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width: 900,
    height: 630,
    minWidth: 900,
    minHeight: 630,

    resizable: false,
    fullscreen: false,
    fullscreenable: false,

    frame: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

let cmdStr = 'stop.bat'
// run commands, if use 'cd xx && ', it‘ll not logout child_process correctly
let cmdPath = process.cwd()
let workerProcess // child_process name
function runExec () {
  return new Promise((resolve, reject) => {
    // run command line, if it hasnt dir or its just project root dir, its noneed cwd prama
    // although noneed cwd param, but the option must be exist: workerProcess = exec(cmdStr, {})
    workerProcess = exec(cmdStr, {cwd: cmdPath})

    // correctly print
    workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data)
    })

    // error print
    workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data)
    })

    // logout print
    workerProcess.on('close', function (code) {
      console.log('out code：' + code)
      resolve()
    })
  })
}

ipc.on('min', function () {
  mainWindow.minimize()
})

ipc.on('max', function () {
  console.log(mainWindow.isMaximized())
  if (mainWindow.isMaximized()) {
    // mainWindow.restore()
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})

ipc.on('close', function () {
  runExec().then(res => {
    mainWindow.close()
  })
})

ipc.on('bbb', function (event) {
  var file = dialog.showOpenDialog({properties: ['openFile', 'multiSelections', 'openDirectory']})
  event.sender.send('sss', file)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
