import { createStore, applyMiddleware } from "redux";
import setData from "../reducer/reducers";
// Saga
import createSagaMiddleware from "redux-saga";

import { watchCheckPassword, watchCheckUserId, watchLogoutUser, watchSearchTag, watchSwitchView, watchSetPrev, watchStopData, watchSelectTag, watchAddUser, watchAddTags, watchClearEncounters, watchDropDown } from "../sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(setData, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchCheckPassword);
sagaMiddleware.run(watchCheckUserId);
sagaMiddleware.run(watchLogoutUser);
sagaMiddleware.run(watchSearchTag);
sagaMiddleware.run(watchSwitchView);
sagaMiddleware.run(watchSetPrev);
sagaMiddleware.run(watchStopData);
sagaMiddleware.run(watchSelectTag);
sagaMiddleware.run(watchAddUser);
sagaMiddleware.run(watchAddTags);
sagaMiddleware.run(watchClearEncounters);
sagaMiddleware.run(watchDropDown);

export default store;
