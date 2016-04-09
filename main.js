var app = require('app'); // Module to control application life.
var util = require('util');//node utilities
var BrowserWindow = require('browser-window'); // Module to create native browser window.
var Menu = require('menu');// used to create native menus that can be used as application menus and context menus.
var Tray = require('tray');//operating system's notification area

var appIcon = null;//empty tray icon

app.on('ready', function ready() {
    var contextMenu = Menu.buildFromTemplate([{
        label: 'Monitor',
        click: function(){ mainWindow.show();}
    }, {
        label: 'Processes',
    }]);

    //build the window
    mainWindow = new BrowserWindow({
        width: 300,
        height: 120,
        x: 9999,
        y: 0,
        frame: false,
        show: false,
        icon: __dirname + '/neutron.png'
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    //build icon and tray
    appIcon = new Tray('neutron.png');
    appIcon.setContextMenu(contextMenu);
    console.log(util.inspect(contextMenu.items[0], {showHidden: false, depth: null}));
    appIcon.on('click', function (e) {
        console.log("click");
        contextMenu.items[0].enabled = true;
        if(mainWindow.isVisible()){
            mainWindow.hide();
        }else{
            mainWindow.show();
        }
    });

    //open devtools
    // mainWindow.webContents.openDevTools();

    //on window close, shut the app
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
