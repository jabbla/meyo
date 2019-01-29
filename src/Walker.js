const { SyncWaterfallHook, SyncHook } = require('tapable');
const { hookCallLog } = require('./HooksDecorators');

class Walker {
    constructor(options){
        this.options = options;

        this.hooks = {
            'enter-pageProto': new SyncHook(['proto']),
            'enter-elementProto': new SyncHook(['proto']),
            'enter-pageRoot-elementProto': new SyncHook(['proto']),
            'enter-componentProto': new SyncHook(['proto']),
            'enter-moduleProto': new SyncHook(['proto']),
            'textProto': new SyncHook(['proto']),

            'leave-pageProto': new SyncHook(['prpto']),
            'leave-elementProto': new SyncHook(['prpto']),
            'leave-pageRoot-elementProto': new SyncHook(['proto']),
            'leave-componentProto': new SyncHook(['prpto']),
            'leave-moduleProto': new SyncHook(['prpto'])
        };

        this.decorateHooks();
    }
    decorateHooks(){
        hookCallLog(this.hooks);
    }
    run(){
        const { proto } = this.options;

        this.walk(proto);
    }
    walk(proto){
        const { config } = proto;
        this[`${config.type}Walk`](proto);
    }
    pageWalk(proto){
        let { config } = proto;
        const { hooks } = this;

        hooks[`enter-${config.type}Proto`].call(proto);

        proto.children && proto.children.forEach(child => this.walk(child));

        hooks[`leave-${config.type}Proto`].call(proto);
    }
    elementWalk(proto){
        let { config } = proto;
        const { hooks } = this;

        hooks[`enter-${config.type}Proto`].call(proto);

        if(config.pageRootComponentEl){
            hooks[`enter-pageRoot-elementProto`].call(proto);
        }

        proto.children && proto.children.forEach(child => this.walk(child));

        hooks[`leave-${config.type}Proto`].call(proto);
        
        if(config.pageRootComponentEl){
            hooks[`leave-pageRoot-elementProto`].call(proto);
        }
    }
    componentWalk(proto){
        let { config } = proto;
        const { hooks } = this;

        hooks[`enter-${config.type}Proto`].call(proto);

        proto.children && proto.children.forEach(child => this.walk(child));

        hooks[`leave-${config.type}Proto`].call(proto);
    }
    moduleWalk(proto){
        let { config } = proto;
        const { hooks } = this;

        hooks[`enter-${config.type}Proto`].call(proto);

        proto.children && proto.children.forEach(child => this.walk(child));

        hooks[`leave-${config.type}Proto`].call(proto);
    }
    textWalk(proto){
        const { hooks } = this;
        hooks.textProto.call(proto);
    }
};

module.exports = Walker;