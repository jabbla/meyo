const { SyncWaterfallHook, SyncHook } = require('tapable');
const { hookCallLog } = require('./HooksDecorators');
const DefaultConfig = require('./DefaultConfig');
const Walker = require('./Walker');

const RegisterPlugin = require('./registerPlugin');

class Meyo {
    constructor({options, config}){
        this.options = options;
        this.userConfig = config;
        this.walker = new Walker(options);

        this.hooks = {
            defaultConfig: new SyncWaterfallHook(['mergedConfig', 'meyo']),
            plugins: new SyncHook(['plugins', 'meyo']),
            walkerRun: new SyncHook(['walker'])
        };

        this.decorateHooks();
        this.defaultConfig();
        this.defaultPlugins();
        this.plugins();
    }
    decorateHooks(){
        hookCallLog(this.hooks);
    }
    defaultPlugins(){
        const { hooks } = this;
        
        hooks.plugins.tap('registerPlugin', RegisterPlugin);
    }
    defaultConfig(){
        this.defaultConfig = new DefaultConfig(this);
        this.mergedConfig = this.defaultConfig.run();
        this.hooks.defaultConfig.call(this.mergedConfig, this);
    }
    plugins(){
        let { plugins } = this.mergedConfig;
        this.hooks.plugins.call(plugins, this);
    }
    run(){
        const { config, hooks } = this;
        
        hooks.walkerRun.call(this.walker, this);
        this.walker.run();
    }
}

module.exports = Meyo;