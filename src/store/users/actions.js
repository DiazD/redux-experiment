import { registerAction } from "../actionHandler"
import { handleAction } from "../middlewares/actionHandlerMiddleware";
import { shallowMerge as merge } from "../commonReducers";

export const updateUsersList = registerAction({
  name: "USERS_UPDATE_LIST",
  effects: { users: merge },
  meta: { updateStrategy: "shallowMerge" }
});

handleAction({
  name: "USERS_UPDATE_LIST",
  handler: (_, { payload }) => ({ users: { [payload.id]: payload } })
});
