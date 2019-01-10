import ProtoLayout from './ProtoLayout';
import { createLayout } from '../layout';
import { parseStyleText } from '../utils';

const RESET_STYLE = {
    margin: '0',
    padding: '0'
};

class ElementLayout extends ProtoLayout {
    constructor(option) {
        super(option);
        
        this.on('layout:proto-drop', this.onProtoDrop.bind(this));
        this.on('layout:append-layout', this.onAppendLayout.bind(this));
    }

    onBuild(options) {
        this._layoutElem = this.createElement(options);

        this.addDomListeners();
        
        return this._layoutElem;
    }

    onAppendLayout(event) {
        let { sourceInfo, options } = event;
        this.appendLayout(createLayout({sourceInfo, parent: this}), options);
    }

    onProtoDrop(event) {
        this.trigger('layout:append-layout', event);
    }

    appendLayout(layout, options) {
        let { _sourceInfo } = this;
        this._protos.push(layout);

        this._layoutElem.insertAdjacentElement('afterbegin', layout.waterFallTrigger('build', options));
    }

    addDomListeners() {
        this._layoutElem.addEventListener('dragover', this.handle_dragover);
        this._layoutElem.addEventListener('drop', this.handle_drop.bind(this));
    }

    handle_dragover(e) {
        e.preventDefault();
    }

    handle_drop(e) {
        let { target, dataTransfer } = e;

        if(target === this._layoutElem){
            //事件冒泡，将id传递至顶层Container
            e._layoutId = this.id;
        }
    }

    createElement(options) {
        let { _sourceInfo } = this;
        let elem = document.createElement(_sourceInfo.tagname);
        let contentElem = document.createElement('span');
        this._contentElem = contentElem;
        this._instanceOpts = options;

        contentElem.innerHTML = options.content || _sourceInfo.name;
        elem.append(contentElem);
        Object.assign(contentElem.style, RESET_STYLE, {
            position: 'absolute',
            right: '0',
            top: '0'
        });

        let styleObj = parseStyleText(options.cssText);

        Object.assign(elem.style, RESET_STYLE, {
            position: 'relative',
            width: options.width,
            height: options.height,
            border: '2px solid #ddd',
            boxSizing: 'border-box'
        }, styleObj);
        
        return elem;
    }

    transformToJson() {
        let jsonObj = {
            type: 'element'
        };
    }
};

export default ElementLayout;