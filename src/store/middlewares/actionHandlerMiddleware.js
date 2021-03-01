
const actionsRegistry = {};
const actionHandlerMiddleware = (store) => (next) => (action) => {
  const handler = actionsRegistry[action.type];

  if (handler) {
    const state = store.getState();
    return next({
      ...action,
      payload: handler(state.root, action)
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
