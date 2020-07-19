export const getBoard = () =>{
    return async dispatch => {
        const result = await fetch("http://localhost:3001/listBoard")
        const boardResult = await result.json()
        dispatch({
            type: "GET_BOARD",
            payload: {
                boards: boardResult
            }
        })
    }
}