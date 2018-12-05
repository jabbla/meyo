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
    }
    /**
     * 触发瀑布流事件，将event作为第一个callback的参数，前一个callback的return值为后一个callback的参数，最后返回值为最后一个callback的返回值
     * @param {string} type 事件类型
     * @param {any} event 事件对象
     */
    waterFallTrigger(type, event) {
        const { callbacks } = this;

        let typedCallbacks = callbacks[type];
        
        if(typedCallbacks){
            return typedCallbacks.reduce((prev, callback) => {
                return callback(prev)
            }, event);
        }
    }
};

export default Emitter;