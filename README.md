# node-iohook
Binding of libuiohook for nodejs

# About

This package help nodejs developer to catch events on mouse and keyboard and register callbacks on every events. 

#requirements

- Windows: VS2015
- MAC: clang
- Linux: GCC

#install

``
  npm install node-iohook
`` 

#example

```
const hook = require('node-iohook')


hook.on('keydown', function(msg){
    console.log(msg);
});


hook.start();

```

#misc
``node-iohook`` work with last ``nodejs`` LTS as well as ``electron``
