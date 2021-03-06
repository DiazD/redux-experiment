import { getIn } from "../utils";

const actionsRegistry = {};
const actionHandlerMiddleware = (store) => (next) => (action) => {
  const handler = actionsRegistry[action.type];
  const skipStep = getIn(["meta", "skipActionMW"], action, false);

  if (handler && !skipStep) {
    const state = store.getState();
    return next({
      ...action,
      payload: { ...action.payload, ...handler(state.db, action) }
    });
  };

  next(action);
};

export const handleAction = ({
  name,
  handler
}) => {
  actionsRegistry[name] = handler;
}

export default actionHandlerMiddleware;
