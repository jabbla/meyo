const prettifyHtml = require('js-beautify').html;

class compiler {
    constructor(proto){
        this.proto = proto;
    }
    run(){
        const { proto } = this;

        let template = prettifyHtml(this.generateRootTemplate(proto));

        return {template};
        console.log(proto);
    }
    generateRootTemplate(proto){
        let res = '';

        if(proto.children && proto.children.length){
            proto.children.forEach(child => {
                let { type } = child.config;
                let childOutterTpl = '';
                
                childOutterTpl = this.generateOutterTpl(child);

                res += childOutterTpl;
            });
        }

        return res;
    }
    generateOutterTpl(proto){
        let { type } = proto.config;
        let res = '';

        if(type === 'component'){
            res = this.generateComponentOutterTpl(proto);
        }

        return res;
    }
    generateComponentOutterTpl(proto){
        let { componentName, attributes = [], slots = [] } = proto.config;

        if(slots.length){
            return `<${componentName} ${attributes.map(attr => `${attr.name}="${attr.value}"`).join(' ')}>
                ${slots.map(slot => {
                    return this.generateOutterTpl(slot);
                }).join('')}
            </${componentName}>`
        }else{
            return `<${componentName} ${attributes.map(attr => `${attr.name}="${attr.value}"`).join(' ')}/>`;
        }
    }
}

module.exports = compiler;