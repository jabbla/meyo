const { SyncHook, SyncWaterfallHook } = require('tapable');
const initPlugin = require('./DefaultConfigPlugins/initPlugin');
const mergePlugin = require('./DefaultConfigPlugins/mergePlugin');

class DefaultConfig {
    constructor(meyo){
        this.hooks = {
            init: new SyncWaterfallHook(['defaultConfig']),
            merge: new SyncWaterfallHook(['defaultConfig', 'userConfig']),
            merged: new SyncHook(['config'])
        };
        this.userConfig = meyo.userConfig;
        this.initPlugins();
    }
    initPlugins(){
        this.hooks.init.tap('initPlugin', initPlugin);
        this.hooks.merge.tap('mergePlugin', mergePlugin);
    }
    run(){
        const {userConfig} = this;

        let defaultConfig = this.defaultConfig = this.hooks.init.call();
        let mergedConfig = this.hooks.merge.call(defaultConfig, userConfig);

        this.hooks.merged.call(mergedConfig);

        return mergedConfig;
    }
}

module.exports = DefaultConfig;