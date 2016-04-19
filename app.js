'use-strict';

//dependencies--------------------
var usage = require('os-usage');
var cpuMonitor = new usage.CpuMonitor();
var ipc = require('electron').ipcRenderer;
var child_process = require('child_process');
var exec = child_process.exec;

//elements-----------------------
var ems = {};
ems.user = document.getElementById('user-container');
ems.sys = document.getElementById('sys-container');
ems.processes = document.getElementById("processes");


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


var memMonitor = new usage.MemMonitor({limit: 10});
memMonitor.on('topMemProcs', function(data) {
    console.log(data);
    if(ems.processes.hasChildNodes() === false){
      initList(data);
    }if(ems.processes.hasChildNodes() === true){
      for(var i = 0; i < data.length; i++){
        ems.processes.childNodes[i].innerHTML = data[i].command + ": memory usage: " + data[i].mem;
      }
    }
    // data looks like: [ { pid: '0', mem: '1521M', command: 'kernel_task' } ]
});

var initList = function(data){
  for (var i = 0; i < data.length; i++) {

    //create list element
    var li = document.createElement("li");
    li.setAttribute("id", data[i].pid);
    li.setAttribute("class", "process");
    ems.processes.appendChild(li);

    // var a = document.createElement("a");
    // a.setAttribute("class", "kill");
    // a.setAttribute("onclick", "kill(this)");
    // a.innerHTML = "kill";
    // li.appendChild(a);
  }
}

var style = function(em, value, color){
    ems[em].style["width"] = value + '%';
    ems[em].style["background-color"] =  color;
};

var expand = function(){
  if(window.innerHeight <= 68){
    ipc.sendSync('synchronous-message', 'expand');
  }else{
    ipc.sendSync('synchronous-message', 'contract');
  }
}

var kill = function(pid){
  exec('kill',[pid], function(err,stout,stderr) {
    console.log(stout);
    if (err) {
      console.log('Child process exited with error code', err.code);
      return
    }
    console.log(stdout);
  });
}
