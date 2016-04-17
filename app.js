'use-strict';

//dependencies--------------------
var usage = require('os-usage');
var cpuMonitor = new usage.CpuMonitor();

//elements-----------------------
var cpuEm = document.getElementById('cpu-container');

//functions-----------------------
cpuMonitor.on('cpuUsage', function(data){
  cpuEm.innerHTML = "CPU Usage: " + data.user + "%";
  style(cpuEm, data.user, "#DD4814");
});

var style = function(em, value, color){
    em.style["width"] = value + '%';
    em.style["background-color"] =  color;
    em.style["border-radius"] = "5px";
};
