import { createLayout } from './layout';

/**
 * 原型开始拖拽事件处理器
 * @param {event} e 
 */
function protoDragStart(e) {
    const { dataTransfer, target } = e;
    const sourceInfo = {...target.dataset};

    dataTransfer.setData('text/plain', JSON.stringify(sourceInfo));
};

/**
 * 原型拖拽结束事件处理器
 * @param {event} e 
 */
function protoDragEnd(e) {
    const { dataTransfer, target } = e;
    const sourceInfo = {...target.dataset};
    dataTransfer.clearData('text/plain');
};

/**
 * 初始化设置原型DOM对象
 * @param {HTMLElement|NodeList} elem 
 */
export function initProtoDom(elem) {
    elem = elem.length? [...elem] : [elem];
    
    elem.forEach(item => {
        item.addEventListener('dragstart', protoDragStart);
        item.addEventListener('dragend', protoDragEnd);
    });
};