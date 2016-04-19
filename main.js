var menubar = require('menubar');
var ipc = require('electron').ipcMain;

var opts = {
    width: 302,
    height: 68,
    "window-position": "topRight",
    resizable: true,
    backgroundColor: '#333333',
    icon: __dirname + '/ic_timeline_white_24dp_1x.png',
    "always-on-top": true
};

var mb = menubar(opts);

mb.on('after-create-window', function ready() {
  ipc.on('synchronous-message', function(event, arg) {
    if(arg == 'expand'){
      mb.window.setSize(302, 300);
      event.returnValue = "expanded";
    }
    if(arg == 'contract'){
      mb.window.setSize(302, 68);
      event.returnValue = "contracted";
    }
  });

  mb.window.openDevTools()
});
