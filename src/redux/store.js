import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { loadState } from "../localStorage";
import userReducer from "./reducers/userReducer";
const persistedState = loadState();
const initialState = {};
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose;
const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
});

const store = createStore(
    reducers,
    // initialState,
    persistedState,
    compose(applyMiddleware(...middleware), reduxDevTools)
);

export default store;
