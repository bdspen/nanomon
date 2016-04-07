var app = require('app'); // Module to control application life.
var util = require('util');//node utilities
var BrowserWindow = require('browser-window'); // Module to create native browser window.
var Menu = require('menu');// used to create native menus that can be used as application menus and context menus.
var Tray = require('tray');//operating system's notification area

var appIcon = null;//empty tray icon

app.on('ready', function ready() {
    //build tray and menu
    appIcon = new Tray('neutron.png');
    var contextMenu = Menu.buildFromTemplate([{
        label: 'CPU',
        type: 'radio'
    }, {
        label: 'MEMORY',
        type: 'radio'
    }, {
        label: 'IO',
        type: 'radio',
        checked: true
    }]);
    appIcon.setContextMenu(contextMenu);

    //build the window
    mainWindow = new BrowserWindow({
        width: 300,
        height: 120,
        x: 9999,
        y: 0,
        icon: __dirname + '/neutron.png'
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    //open devtools
    mainWindow.webContents.openDevTools();

    //on window close, shut the app
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
