class ProtoLayout {
    static id = 0;
    constructor(option) {
        this._sourceInfo = option.sourceInfo;
        this.id = ++ProtoLayout.id;
    }
};

export default ProtoLayout;