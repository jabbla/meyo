import setCurrenProto from './setCurrentProto';
import elements from '../../proros/element';

const initialState = {
    currentProto: {},
    elements,
    protoTypes: [
        {id: 1, name: 'module'},
        {id: 2, name: 'page'}
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
