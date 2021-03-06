import { registerAction } from "./actionHandler"
import { handleAction } from "./middlewares/actionHandlerMiddleware";
import {
  shallowMerge as merge,
  getIds as computeIds,
  complement,
} from "./commonReducers";

export const usersTogglePermissions = registerAction({
  name: "USERS_TOGGLE_PERMISSIONS",
  rootState: "permissions",
  effects: { userCanUpdateList: complement }
})

export const usersUpdateList_ = registerAction({
  name: "USERS_UPDATE_LIST_V2",
  rootState: "users",
  injectRootStateTo: ["byId"],
  effects: {
    list: merge,
    byId: (state) => {
      state.byId = computeIds(state.list);
      return state;
    },
  }
});

// intercept the action before hitting reducer
handleAction({
  name: "USERS_UPDATE_LIST_V2",
  handler: ({ permissions }, { payload }) => {
    const list = permissions.userCanUpdateList ? { [payload.id]: payload } : undefined
    return { list }
  }
})
