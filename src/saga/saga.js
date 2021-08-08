import { all, } from 'redux-saga/effects'

import { 
	watchAuth,
	watchOffices,


} from "./watcher/index"

export default function* saga() {
	yield all([
		watchAuth(),
		watchOffices(),
	])
}