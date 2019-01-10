import ProtoLayout from './ProtoLayout';
import { createLayout } from '../layout';
import { parseStyleText } from '../utils';

const RESET_STYLE = {
    margin: '0',
    padding: '0'
};

class ModuleLayout extends ProtoLayout {
    static transformToJson({ _protos, _proto, protoTypeMap }) {
        let jsonObj = {..._proto, type: protoTypeMap[_proto.type]};
        jsonObj.children = _protos.map(proto => {
            return proto.transformToJson();
        });
        console.log('ModuleLayout transformToJson', jsonObj);
    }

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
};

export default ModuleLayout;