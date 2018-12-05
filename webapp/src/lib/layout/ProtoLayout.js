import Emitter from '../Emitter';

//const beforeCreateDom = Symbol('beforeCreateDom');
//const afterCreateDom = Symbol('afterCreateDom');

class ProtoLayout {
    static id = 0;
    constructor(option) {
        this._sourceInfo = option.sourceInfo;
        this.id = ++ProtoLayout.id;
        this._emitter = new Emitter();
        this._parent = option.parent;
        this._protos = [];
        setTimeout(() => {
            //触发beforeCreateDom钩子函数
            this.trigger('initialized');
        }, 0);

        this._parent.on('broadcast', this.onBroadcast.bind(this));
        this.on('build', this.onBuild.bind(this));
    }

    createLayoutDom() {
        //抽象方法
    }

    onBroadcast(event) {
        if(event.layoutId === this.id){
            this.trigger(event.type, event);
            return;
        }
        this.trigger('broadcast', event);
    }

    on(type, callback) {
        this._emitter.on(type, callback);
    }

    off(type, callback) {
        this._emitter.off(type, callback);
    }

    trigger(type, event) {
        this._emitter.trigger(type, event);
    }

    waterFallTrigger(type, event) {
        return this._emitter.waterFallTrigger(type, event);
    }
};

export default ProtoLayout;