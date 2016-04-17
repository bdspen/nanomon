'use-strict';

//dependencies--------------------
var usage = require('os-usage');
var cpuMonitor = new usage.CpuMonitor();

//elements-----------------------
var ems = {};
ems.user = document.getElementById('user-container');
ems.sys = document.getElementById('sys-container');


//functions-----------------------
cpuMonitor.on('cpuUsage', function(data){
  ems.user.innerHTML = "User: " + data.user + "%";
  ems.sys.innerHTML = "System: " + data.sys + "%";
  data.userColor = "#3862e0";
  data.sysColor = "#DD4814";
  for(var key in ems){
    style(key, data[key], data[key + "Color"]);
  }
});


var memMonitor = new usage.MemMonitor();
memMonitor.on('topMemProcs', function(data) {
    console.log(data);
    for(var i = 0; i < data.length; i++){
      // createProcessList(data[i]);
    }

    // [ { pid: '0', mem: '1521M', command: 'kernel_task' } ]
});

var createProcessList = function(data){
  var processes = document.getElementById("processes");
  var li = document.createElement("li");
  processes.appendChild(li);
  li.innerHTML = data.command + ": memory usage: " + data.mem;
}

var style = function(em, value, color){
    ems[em].style["width"] = value + '%';
    ems[em].style["background-color"] =  color;
};
