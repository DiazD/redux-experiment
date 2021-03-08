import { createStore, applyMiddleware, compose, combineReducers } from "redux";

// root-reducer
import { initialState, db, ui } from "./reducers";

// middlewares
import actionHandlerMiddleware from "./middlewares/actionHandlerMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root = combineReducers({
  db,
  ui,
});

const store = createStore(
  root,
  initialState,
  composeEnhancers(applyMiddleware(actionHandlerMiddleware))
);

export default store;
