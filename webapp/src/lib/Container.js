import { initLayoutContainerDom } from './dom';
import { createLayout } from './layout';
import Emitter from './Emitter';

class Container {
    constructor(option) {
        this._elem = option.elem;
        this._protos = [];
        this._proto = option.proto;
        this._emitter = new Emitter();
        this.addListeners();
        this.on('container:append-layout', this.onAppendLayout.bind(this));
    }

    addListeners() {
        const { _elem } = this;

        _elem.addEventListener('dragover', this.handle_dragover);
        _elem.addEventListener('drop', this.handle_drop.bind(this));
    }

    onAppendLayout(event){
        let { sourceInfo, options } = event;
        this.appendLayout(createLayout({sourceInfo, parent: this}), options);
    }

    appendLayout(layout, options) {
        this._protos.push(layout);
        
        this._elem.append(layout.waterFallTrigger('build', options));
    }

    handle_dragover(e) {
        e.preventDefault();
    }

    handle_drop(e) {
        const { dataTransfer, target, _layoutId } = e;
        const sourceInfo = JSON.parse(dataTransfer.getData('text/plain'));
        
        this.trigger('container:proto-drop', { sourceInfo, fromLayout: target !== this._elem, layoutId: _layoutId });
    }

    on(type, callback) {
        this._emitter.on(type, callback);
    }

    off(type, callback) {
        this._emitter.off(type, callback);
    }

    trigger(type, event) {
        let pattern = /^(.*)(?=:)/;
        let execRes = pattern.exec(type);
        let isContainer = !execRes || (execRes[0] === 'container');

        if(isContainer && type !== 'broadcast'){
            this._emitter.trigger(type, event);
        }else{
            this._emitter.trigger('broadcast', {type, ...event});
        }
    }

    transformToJson() {
        let { _protos, _proto } = this;
        console.log('transformToJson', _proto);

        return _protos;
    }
};

export default Container;