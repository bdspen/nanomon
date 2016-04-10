# _NanoMon_

#### _A nano-sized system resource monitor , 4/2016_

#### By _**Benjamin Spenard**_

## Description

_A small tool that allows you to keep track of the load on your system's CPU and Memory_

## Installation

At this early stage of development, If you would like to run the program, clone this repo, run `npm install`, navigate to the project directory and run: `electron .`

## bugs / to-do
* test on other platforms
* The memory usage monitor currently displays the memory usage _including memory that can be made available to the running processes._ To put that another way, the memory usage bar may show that your machine is using 90% when actually most of the memory use is for buffers and cache. Linux will free up the buffers and cache to yield memory for other applications, so this memory report is not exactly the report I would like.

## Contact Details

_please contact me at bdspen@gmail.com if you would like to contribute to the project, or have any other feedback._

## Technologies Used

Built with:
* Electron
* Node.js

### License

Copyright (c) 2015 **_Benjamin Spenard_**
*This software is licensed under the MIT license*
