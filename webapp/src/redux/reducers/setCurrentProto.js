export default function(state, action){
    return Object.assign({}, state, {
        currentProto: {...action.payload}
    });
};