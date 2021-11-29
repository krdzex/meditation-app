import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import timerReducer from "./timerReducer";
const allReducers = combineReducers({
    loginReducer,
    timerReducer

})

export default allReducers;

