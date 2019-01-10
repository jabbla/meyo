import ProtoLayout from './ProtoLayout';
import { createLayout } from '../layout';
import { parseStyleText } from '../utils';

const RESET_STYLE = {
    margin: '0',
    padding: '0'
};

class PageLayout extends ProtoLayout {
    static transformToJson({ _protos, _proto }) {
        console.log('PageLayoutt transformToJson', _protos, _proto);
    }

    constructor(option) {
        super(option);
        
        this.on('layout:proto-drop', this.onProtoDrop.bind(this));
        this.on('layout:append-layout', this.onAppendLayout.bind(this));
    }
};

export default PageLayout;