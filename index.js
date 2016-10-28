'use strict'

const NodeHookAddon = require("bindings")("node-iohook");
const EventEmitter = require('events');

class IOCallback{

	constructor()
	{
		this._cbObject = {};
	}
	add(event,cb)
	{
		this._cbObject[event]=cb;
	}
	getCB(){
		let that = this;
		return function(msg){
			
			if(msg.type==3)
			{
				if(that._cbObject["key_pressed"])
				{
					that._cbObject["key_pressed"](msg);	
				}

			}
			else if(msg.type==7)
			{
				
				if(that._cbObject["mouse_pressed"])
				{
					that._cbObject["mouse_pressed"](msg);	
				}	
			}
		}
	}



}

class IOHook {

	constructor(){
		this.eventEmitter = new EventEmitter();
		this.callback = new IOCallback();
	}
	

	on(event,callback)
	{
		this.callback.add(event,callback);
		
	}	

	start(){
		NodeHookAddon.start_hook(this.callback.getCB())
	}

}

const ioHook = new IOHook();

ioHook.on("mouse_pressed",function(msg){
	console.log(msg);
})
ioHook.on("key_pressed",function(msg){
	console.log(msg);
})

ioHook.start();

