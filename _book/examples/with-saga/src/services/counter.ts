// ______________________________________________________
//
// @ Counter Service

import { fork, take, select, put } from 'redux-saga/effects'
import { Counter, Todos } from '../store'
import { StoreST } from '../store'

function* mapTodosCountToCounter(): IterableIterator<any> {
  const { setTodoCount } = Counter.creators
  while (true) {
    yield take(Todos.types.addTodo)
    const storeState: StoreST = yield select()
    yield put(setTodoCount(storeState.todos.items.length))
  }
}

export function* rootSaga() {
  yield fork(mapTodosCountToCounter)
}
