import { all, } from 'redux-saga/effects'

import { 
	watchOffices,

} from "./watcher/index"

export default function* saga() {
	yield all([
		watchOffices(),
	])
}