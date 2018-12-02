import ElementLayout from './ElementLayout';

export function createLayout(option) {
    let { sourceInfo } = option;

    if(sourceInfo.type === 'element'){
        return new ElementLayout(option);
    }
};