export const setCurrentProto = ({type, name, desc}) => ({
    type: 'SET_CURRENT_PROTO',
    payload: {type, name, desc}
});