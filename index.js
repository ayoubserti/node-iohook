'use strict'

const NodeHookAddon = require("bindings")("node-iohook");
const EventEmitter = require('events');

class IOCallback{

	constructor()
	{
		this._cbObject = {};
		this.active = false;
	}
	add(event,cb)
	{
		this._cbObject[event]=cb;
	}
	getCB(cb){
		let that = this;
		return function(msg){
			
			if(that.active==false) return;
			if(msg==undefined) {console.log(msg); return;}
			if(msg.type==3)
			{
				if(that._cbObject["keypress"])
				{
					that._cbObject["keypress"](msg);
				}

			}
			else if(msg.type==4)
			{
				if(that._cbObject["keydown"])
				{
					that._cbObject["keydown"](msg);
				}

			}
			else if(msg.type==5)
			{
				if(that._cbObject["keyup"])
				{
					that._cbObject["keyup"](msg);
				}

			}
			else if(msg.type==6)
			{
				if(that._cbObject["mouseclick"])
				{
					that._cbObject["mouseclick"](msg);
				}

			}
			else if(msg.type==7)
			{
				if(that._cbObject["mousedown"])
				{
					that._cbObject["mousedown"](msg);
				}

			}
			else if(msg.type==8)
			{
				
				if(that._cbObject["mouseup"])
				{
					that._cbObject["mouseup"](msg);	
				}	
			}
			else if (msg.type == 9)
			{
				if(that._cbObject["mousemove"])
				{
					that._cbObject["mousemove"](msg);	
				}	
			}
			else if (msg.type == 10)
			{
				if(that._cbObject["mousedrag"])
				{
					that._cbObject["mousedrag"](msg);	
				}	
			}
			else if( msg.type == 11)
			{
				if(that._cbObject["mousewheel"])
				{
					that._cbObject["mousewheel"](msg);	
				}
			}
		}
	}



}

class IOHook {

	constructor(){
		this.eventEmitter = new EventEmitter();
		this.callback = new IOCallback();
		this.status = "stoped"
	}
	

	on(event,callback)
	{
		this.callback.add(event,callback);
		
	}	

	start(callback){
		if(this.status == "stoped")
		{
			NodeHookAddon.start_hook(this.callback.getCB(callback))
			this.status = "started"	
			this.callback.active = true;
		}
		
	}

	pause()
	{
		this.callback.active = false;
	}

	resume()
	{
		this.callback.active = true;
	}

	stop(){
		NodeHookAddon.stop_hook();
	}

}

module.exports = IOHook;