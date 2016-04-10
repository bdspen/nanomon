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
        // console.log(cpuPercent);
        cpuEm.innerHTML = "CPU USAGE: " + cpuPercent + "%";
        style(cpuEm, cpuPercent, "#DD4814");
    })
}

var memoryPercentMon = function(){
    var memoryPercent = Math.abs((os.freememPercentage() * 100).toFixed(2)- 100);
    var freeMem = (os.freemem() / 1024).toFixed(2);
    // console.log(memoryPercent);
    memoryPercentEm.innerHTML = "MEMORY USAGE: " + memoryPercent + " %" + " / FREE: " + freeMem + " GB";
    style(memoryPercentEm, memoryPercent, "#77216F");
}

var style = function(em, value, color){
    em.style["width"] = value + '%';
    em.style["background-color"] =  color;
    em.style["border-radius"] = "6px";
}
var bytesToSize = function (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

//updates the monitored values per unit of time.
setInterval(cpuMon, 1000);
setInterval(memoryPercentMon, 2000);
