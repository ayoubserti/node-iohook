const NodeHookAddon = require("bindings")("node-iohook");

NodeHookAddon.start_hook(function(event)
{
	console.log(event)
})