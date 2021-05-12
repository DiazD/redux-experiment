import { bulkRegisterActions } from "../actionHandler"
import { handleAction } from "../middlewares/actionHandlerMiddleware";
import { shallowMerge as merge, removeOne } from "../commonReducers";

export const actions = bulkRegisterActions({
  actions: {
    removeUser: {
      name: "USERS_LIST_REMOVE_ONE",
      effects: { users: removeOne },
    },
    updateUsersList: {
      name: "USERS_UPDATE_LIST",
      effects: { users: merge },
    }
  },
});

handleAction({
  name: "USERS_UPDATE_LIST",
  handler: (_, { payload }) => ({ users: { [payload.id]: payload } })
});
