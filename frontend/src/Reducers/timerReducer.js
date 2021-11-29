const timerReducer = (state = 0, action) => {
    switch (action.type) {
        case "INCRASE_TIMER":
            return state + 1
        default:
            return state;
    }
}
export default timerReducer;