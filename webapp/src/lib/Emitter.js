class Emitter {
    constructor() {
        this.callbacks = {};
    }
    /**
     * 注册事件
     * @param {string|symbol} type 事件类型
     * @param {function} callback 事件处理函数
     */
    on(type, callback) {
        const { callbacks } = this;

        if(!callbacks[type]) {
            callbacks[type] = [callback];
        }else{
            callbacks[type].push(callback);
        }

        return this;
    }
    /**
     * 解除事件注册函数
     * @param {string|symbol} type 事件类型
     * @param {function} callback 事件处理函数
     */
    off(type, callback) {
        const { callbacks } = this;

        if(!callbacks[type]){
            return;
        }

        let typedCallbacks = callbacks[type];
        for(let i = typedCallbacks.length - 1; i >= 0; i--){
            if(typedCallbacks[i] === callback){
                typedCallbacks.splice(i, 0);
            }
        }

        return this;
    }
    /**
     * 触发事件
     * @param {string|symbol} type 事件类型
     * @param {any} event 事件对象
     */
    trigger(type, event) {
        const { callbacks } = this;

        let typedCallbacks = callbacks[type];
        
        if(typedCallbacks){
            typedCallbacks.forEach(callback => callback(event));
        }

        return this;
    }
};

export default Emitter;