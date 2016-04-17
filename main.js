var menubar = require('menubar')

var opts = {
    width: 302,
    height: 22,
    "window-position": "topRight",
    resizable: false,
    backgroundColor: '#333333',
    icon: __dirname + '/ic_timeline_white_24dp_1x.png',
    "always-on-top": true
};

var mb = menubar(opts);

mb.on('after-create-window', function ready() {

  // mb.window.openDevTools()
});
