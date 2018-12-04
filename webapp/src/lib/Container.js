import { initLayoutContainerDom } from './dom';
import { createLayout } from './layout';
import Emitter from './Emitter';

class Container {
    constructor(option) {
        this._elem = option.elem;
        this._protos = [];
        this._emitter = new Emitter();
        this.addListeners();
    }


    addListeners() {
        const { _elem } = this;

        _elem.addEventListener('dragover', this.handle_dragover);
        _elem.addEventListener('drop', this.handle_drop.bind(this));
    }

    handle_dragover(e) {
        e.preventDefault();
    }

    handle_drop(e) {
        const { dataTransfer, target } = e;
        const sourceInfo = JSON.parse(dataTransfer.getData('text/plain'));

        const layoutIns = createLayout({ sourceInfo });
        
        this._protos.push(layoutIns);
        this.trigger('proto-drop', layoutIns);
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
};

export default Container;