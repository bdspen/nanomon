'use-strict';

//dependencies--------------------
var usage = require('os-usage');
var cpuMonitor = new usage.CpuMonitor();
var ipc = require('electron').ipcRenderer;
var spawn = require('child_process').spawn;
var opts = {limit: 19};//options for memMonitor and CpuMonitor

//elements-----------------------
var ems = {};
ems.user = document.getElementById('user-container');
ems.sys = document.getElementById('sys-container');
ems.processes = document.getElementById("processes");


//functions-----------------------
cpuMonitor.on('cpuUsage', function(data){//monitors the Cpu
  ems.user.innerHTML = "User: " + data.user + "%";//user cpu usage
  ems.sys.innerHTML = "System: " + data.sys + "%";//system cpu usage
  data.userColor = "#3862e0";
  data.sysColor = "#DD4814";
  for(var key in ems){//for every iteration, animate the container bars
    style(key, data[key], data[key + "Color"]);
  }
});

var memMonitor = new usage.MemMonitor(opts);//monitors processes and memory
memMonitor.on('topMemProcs', function(data) {
    //checks to see if there is a list before initailizing list
    if(ems.processes.hasChildNodes() === false){
      initList(data);//creates the list of html elements
    }if(ems.processes.hasChildNodes() === true){
      for(var i = 0; i < data.length; i++){
        ems.processes.childNodes[i].innerHTML = data[i].command + ": memory usage: " + data[i].mem;
      }
    }
    // data looks like: [ { pid: '0', mem: '1521M', command: 'kernel_task' } ]
});

var initList = function(data){
  //for every process create a li with specific id, class "process" and click event to kill
  for (var i = 0; i < data.length; i++) {
    var process = document.createElement("div");
    process.setAttribute("id", data[i].pid);
    process.setAttribute("class", "process");
    process.onclick = function(){
      killProcess(this.id)
    }
    ems.processes.appendChild(process);
  }
}

//animates the width of the cpu monitor (container) bars
var style = function(em, value, color){
    ems[em].style["width"] = value + '%';
    ems[em].style["background-color"] =  color;
};

//ask for confirmation and kill process if confirmed
var killProcess = function(pid){
  var confirmed = window.confirm("Are you sure you want to kill process: " + pid + "?");
  if(confirmed == true){
    var kill = spawn('kill', [pid]);
  }else{
    return;
  }
}

//sends a message to the main.js file to expand the window size
var expand = function(){
  if(window.innerHeight <= 68){
    ipc.sendSync('synchronous-message', 'expand');
  }else{
    ipc.sendSync('synchronous-message', 'contract');
  }
}
