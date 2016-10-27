#pragma once

#include <nan.h>

#include <nan_object_wrap.h>

class HookWorker : public Nan::AsyncWorker
{
    public:
        HookWorker(Nan::Callback * callback); 
            
    void Execute();
    void HandleOKCallback () ;

    private:
		int a;
};
