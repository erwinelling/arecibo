var arecibo=new Object();arecibo.loaded=false;arecibo.register=function(d,c,b){if(d.addEventListener){d.addEventListener(c,b,false);return true}else{if(d.attachEvent){var a=d.attachEvent("on"+c,b);return a}}return false};arecibo.addInput=function(c,e,a,d){if(typeof(d)=="undefined"){return}var b=e.createElement("input");b.setAttribute("type","text");b.setAttribute("name",a);b.setAttribute("value",d);c.appendChild(b)};arecibo.addTextArea=function(c,e,a,d){if(typeof(d)=="undefined"){return}var b=e.createElement("textarea");b.setAttribute("type","text");b.setAttribute("name",a);b.innerHTML=d;c.appendChild(b)};arecibo.createForm=function(){try{var b=window.frames.error.document}catch(f){return}if(arecibo.loaded){return}arecibo.loaded=true;var d=b.createElement("form");var c=(("https:"==document.location.protocol)?"https://":"http://");d.setAttribute("action",c+"{{ domain }}/v/1/");d.setAttribute("method","post");var a=new Date;arecibo.addInput(d,b,"account",arecibo.account);arecibo.addInput(d,b,"server",arecibo.server);arecibo.addTextArea(d,b,"msg",arecibo.msg);arecibo.addInput(d,b,"status",arecibo.status);arecibo.addInput(d,b,"priority",arecibo.priority);arecibo.addInput(d,b,"uid",arecibo.uid);arecibo.addInput(d,b,"username",arecibo.username);arecibo.addInput(d,b,"timestamp",a.toUTCString());if(typeof(arecibo.url)=="undefined"){arecibo.addInput(d,b,"url",window.location)}else{arecibo.addInput(d,b,"url",arecibo.url)}arecibo.addInput(d,b,"type",arecibo.type);arecibo.addTextArea(d,b,"traceback",arecibo.traceback);arecibo.addTextArea(d,b,"request",arecibo.request);b.body.appendChild(d);d.submit()};arecibo.postLoad=function(){var a=document.createElement("iframe");a.name="error";a.id="error";a.style.visibility="hidden";arecibo.register(a,"load",arecibo.createForm);document.body.appendChild(a)};arecibo.run=function(){arecibo.register(window,"load",arecibo.postLoad)};arecibo.recordException=function(b){arecibo.msg=b.toString();arecibo.type=b.name;var a;if(b.line){a=b.line}else{if(b.lineNumber){a=b.lineNumber}}if(b.sourceURL){arecibo.url=b.sourceURL}else{if(b.fileName){arecibo.url=b.fileName}else{arecibo.url=window.location}}if(a){arecibo.msg=arecibo.url+" line "+a+": "+arecibo.msg}if(b.stack){arecibo.traceback=b.stack}arecibo.postLoad()};arecibo.registerGlobalHandler=function(){window.onerror=function(d,b,c,a){arecibo.msg=b+" at line "+c+": "+d;arecibo.traceback=a;arecibo.url=b;arecibo.postLoad()}};