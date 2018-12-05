import ProtoLayout from './ProtoLayout';

const RESET_STYLE = {
    margin: '0',
    padding: '0'
};

class ElementLayout extends ProtoLayout {
    constructor(option) {
        super(option);

        this.on('layout:proto-drop', this.onProtoDrop.bind(this));
    }

    onBuild(options) {
        this._layoutElem = this.createElement(options);

        this.addDomListeners();
        
        return this._layoutElem;
    }

    onProtoDrop(e) {
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

        elem.innerHTML = options.content || _sourceInfo.name;

        Object.assign(elem.style, RESET_STYLE, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: options.width,
            height: options.height,
            border: '2px solid #ddd',
            boxSizing: 'border-box'
        });
        
        return elem;
    }
};

export default ElementLayout;