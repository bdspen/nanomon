var app = require('app'); // Module to control application life.
var util = require('util'); //node utilities
var BrowserWindow = require('browser-window'); // Module to create native browser window.
var Menu = require('menu'); // used to create native menus that can be used as application menus and context menus.
var Tray = require('tray'); //operating system's notification area

var appIcon = null; //empty tray icon

app.on('ready', function ready() {
    var contextMenu = Menu.buildFromTemplate([{
        label: 'Monitor',
        click: function() {
            if (mainWindow.isVisible()) {
                mainWindow.hide();
            } else {
                mainWindow.show();
            }
        }
    }]);

    //build the window
    mainWindow = new BrowserWindow({
        width: 304,
        height: 68,
        x: 9999,
        y: 0,
        backgroundColor: '#333333',
        transparent: true,
        frame: false,
        show: true,
        icon: __dirname + '/neutron.png'
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    //build icon and tray
    appIcon = new Tray('neutron.png');
    appIcon.setContextMenu(contextMenu);

    //open devtools
    mainWindow.webContents.openDevTools();

    //on window close, shut the app
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
