# Tray

> 系统托盘

```js
var gui = require('nw.gui')
var win = gui.Window.get()
var isShowWindow = true

var tray = new nw.Tray({
  title: 'EDR',
  tooltip: 'EDR Terminal',
  icon: './asstes/img/33.png'
})

var menu = new gui.Menu()
menu.append(
  new gui.MenuItem({
    type: 'normal',
    label: '退出',
    click:() =>  {
      win.close(true);
    }
  })
)
sessionStorage.setItem('trayItem', true)
tray.menu = menu
tray.on('click',
  function () {
    if (isShowWindow) {
      win.hide();
      isShowWindow = false;
    }
    else {
      win.show();
      isShowWindow = true;
    }
  }
)

win.on('close', function () {
  win.hide()
})

window.onbeforeunload = () => {
  tray.remove()
}


```
