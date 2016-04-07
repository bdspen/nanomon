'use-strict';
//dependencies--------------------
var os = require('os-utils');

//elements-----------------------
var cpuEm = document.getElementById('cpu');
var memoryPercentEm = document.getElementById('memory-percent');
var freeMemEm = document.getElementById('freemem');

//functions-----------------------
var cpuMon = function() {
    os.cpuUsage(function(v) { //will return cpu usage in % over 1s
        var cpuPercent = (v * 100).toFixed(2);
        cpuEm.innerHTML = cpuPercent;
        style(cpuEm, cpuPercent, "green");
    })
}

var memoryPercentMon = function(){
    var memoryPercent = os.freememPercentage() * 100
    memoryPercentEm.innerHTML = memoryPercent + " %";
    style(memoryPercentEm, memoryPercent, "blue");
}

var freeMemMon = function(){
    var freeMem = (os.freemem() / 100).toFixed(2);
    freeMemEm.innerHTML = (freeMem + " GB");
}

var style = function(em, value, color){
    em.style["width"] = value + '%';
    em.style["background-color"] =  color;
}
//updates the monitored values per unit of time.
setInterval(cpuMon, 1000);
setInterval(memoryPercentMon, 1000);
setInterval(freeMemMon, 1000);
