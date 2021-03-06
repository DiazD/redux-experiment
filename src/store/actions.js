import { registerAction, bulkRegisterActions } from "./actionHandler"
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

// Example: of how you would register a single action
// export const usersUpdateList_ = registerAction({
//   name: "USERS_UPDATE_LIST_V2",
//   rootState: "users",
//   injectRootStateTo: ["byId"],
//   effects: {
//     list: merge,
//     byId: (state) => {
//       state.byId = computeIds(state.list);
//       return state;
//     },
//   }
// });

export const actions = bulkRegisterActions({
  rootState: "users",
  actions: {
    usersUpdateList: {
      name: "USERS_UPDATE_LIST",
      injectRootStateTo: ["byId"],
      effects: {
        list: merge,
        byId: (state) => {
          state.byId = computeIds(state.list);
          return state;
        },
      }
    }
  }
});

// intercept the action before hitting reducer
// NOTE: permission system should be lifted to a middleware
// this just show cases the ability to interact and modify
// action payload based on current state.
handleAction({
  name: "USERS_UPDATE_LIST",
  handler: ({ permissions }, { payload }) => {
    const list = permissions.userCanUpdateList ? { [payload.id]: payload } : undefined
    return { list }
  }
})
