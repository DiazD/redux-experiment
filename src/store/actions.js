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
  actions: {
    usersUpdateList: {
      name: "USERS_UPDATE_LIST",
      effects: { users: merge }
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
    const users = permissions.userCanUpdateList ? { [payload.id]: payload } : undefined
    return { users }
  }
})

export const phoneActions = bulkRegisterActions({
  rootState: ["phonebooks"],
  actions: {
    updateFamilyPhonebook: {
      name: "UPDATE_FAMILY_PHONEBOOK",
      effects: { family: merge }
    },
    updateWorkPhonebook: {
      name: "UPDATE_WORK_PHONEBOOK",
      effects: { work: merge }
    },
  },
});

handleAction({
  name: "UPDATE_FAMILY_PHONEBOOK",
  handler: (_, { payload }) => ({
    family: { [payload.id]: payload },
  })
});
