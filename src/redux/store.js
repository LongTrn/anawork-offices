import { 
	createStore, 
	applyMiddleware, 
	combineReducers,
} from "redux";
import createSagaMiddleware from "@redux-saga/core"
import saga from "../saga/saga"
import {
	officesReducer as offices,
} from "./index.js"

const sagaMiddleware = createSagaMiddleware()
const reducers = combineReducers({
	offices,

})

const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware),

)

sagaMiddleware.run(saga)

export default store;