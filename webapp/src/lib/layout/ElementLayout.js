import ProtoLayout from './ProtoLayout';

class ElementLayout extends ProtoLayout {
    constructor(option) {
        super(option);
    }

    createLayoutDom() {
        let { _sourceInfo } = this;
        let { tagname } = _sourceInfo;

        const layoutDom = document.createElement(tagname);

        this._layoutDom = layoutDom;
    }
};

export default ElementLayout;