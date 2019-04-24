import { createStore, applyMiddleware } from "redux";
import setData from "../reducer/reducers";
// Saga
import createSagaMiddleware from "redux-saga";

import { watchCheckPassword, watchCheckUserId, watchLogoutUser, watchSearchTag, watchSwitchView } from "../sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(setData, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchCheckPassword);
sagaMiddleware.run(watchCheckUserId);
sagaMiddleware.run(watchLogoutUser);
sagaMiddleware.run(watchSearchTag);
sagaMiddleware.run(watchSwitchView);

export default store;
