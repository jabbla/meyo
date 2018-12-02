import setCurrenProto from './setCurrentProto';
import elements from '../../proros/element';

const initialState = {
    currentProto: {},
    elements,
    protoTypes: [
        {id: 1, name: '模块原型'},
        {id: 2, name: '页面原型'}
    ]
};

function meyoApp(state = initialState, action){
    switch(action.type){
        case 'SET_CURRENT_PROTO':
            return setCurrenProto(state, action);
        default: 
            return state;
    }
}

export default meyoApp;
