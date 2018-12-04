import { initLayoutContainerDom } from './dom';
import { createLayout } from './layout';

class Container {
    constructor(option) {
        this._elem = option.elem;

        this.addListeners();
    }


    addListeners() {
        const { _elem } = this;

        _elem.addEventListener('dragover', this.handle_dragover);
        _elem.addEventListener('drop', this.handle_drop);
    }

    handle_dragover(e) {
        e.preventDefault();
    }

    handle_drop(e) {
        const { dataTransfer, target } = e;
        const sourceInfo = JSON.parse(dataTransfer.getData('text/plain'));

        const layoutIns = createLayout({ sourceInfo });
        layoutIns.on('beforeCreateDom', () => {
            console.log('334');
        });
        console.log(layoutIns)
    }
};

export default Container;