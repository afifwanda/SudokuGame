const initialState = {
    board : []
}

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case "GET_BOARD":
            return{...state, board : action.payload.boards};
        default:
            return state
    }
}

export default reducer