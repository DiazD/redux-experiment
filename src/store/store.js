import { createStore, applyMiddleware, compose, combineReducers } from "redux";

// root-reducer
import rootReducer, { initialState } from "./reducers";

// middlewares
import actionHandlerMiddleware from "./middlewares/actionHandlerMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root = combineReducers({
  root: rootReducer
});

const store = createStore(
  root,
  initialState,
  composeEnhancers(applyMiddleware(actionHandlerMiddleware))
);

export default store;
