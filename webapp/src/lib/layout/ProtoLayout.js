import Emitter from '../Emitter';

//const beforeCreateDom = Symbol('beforeCreateDom');
//const afterCreateDom = Symbol('afterCreateDom');

class ProtoLayout {
    static id = 0;
    constructor(option) {
        this._sourceInfo = option.sourceInfo;
        this.id = ++ProtoLayout.id;
        this._emitter = new Emitter();

        setTimeout(() => {
            //触发beforeCreateDom钩子函数
            this.trigger('beforeCreateDom');
            this.createLayoutDom();
            this.trigger('afterCreateDom')
        }, 0);
    }

    createLayoutDom() {
        //抽象方法
    }

    on(type, callback) {
        this._emitter.on(type, callback);
    }

    off(type, callback) {
        this._emitter.off(type, callback);
    }

    trigger(type) {
        this._emitter.trigger(type);
    }
};

export default ProtoLayout;