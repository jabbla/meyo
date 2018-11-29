import setCurrenProto from './setCurrentProto';
import elements from '../../proros/element';

const initialState = {
    currentProto: {},
    elements
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
