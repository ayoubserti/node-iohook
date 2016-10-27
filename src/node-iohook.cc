#include "uiohook.h"
#include "node-iohook.h"
#include <iostream>

using namespace v8;
using Callback = Nan::Callback;
static bool sIsRuning=false; 


bool logger_proc(unsigned int level, const char *format, ...) {
	return true;
}

void dispatch_proc(uiohook_event * const event) {

}



HookWorker::HookWorker(Nan::Callback * inCallback)
    :Nan::AsyncWorker(inCallback)
{

}

void HookWorker::Execute(){
	hook_set_logger_proc(&logger_proc);
	hook_set_dispatch_proc(&dispatch_proc);
	int status = hook_run();
	std::cerr << status << std::endl;

}

void HookWorker::HandleOKCallback (){}


NAN_METHOD(StartHook) {

    //allow one single execution
    if(sIsRuning==false)
    {
        if(info.Length() >0)
        {
			if (info[0]->IsFunction())
			{
				Callback* callback = new Callback(info[0].As<Function>());
				Nan::AsyncQueueWorker(new HookWorker(callback));
				sIsRuning = true;
			}
        }
    }
}


NAN_MODULE_INIT(Init) {
   
  

   Nan::Set(target, Nan::New<String>("start_hook").ToLocalChecked(),
	   Nan::GetFunction(Nan::New<FunctionTemplate>(StartHook)).ToLocalChecked());
}

NODE_MODULE(nodeHook, Init)