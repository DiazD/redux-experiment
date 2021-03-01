import { registerAction } from "./actionHandler"
import { handleAction } from "./middlewares/actionHandlerMiddleware";
import {
  shallowMerge as merge,
  getIds as computeIds,
  complement,
} from "./commonReducers";
import { printState } from "./utils";

export const USERS_UPDATE_LIST = "USERS_UPDATE_LIST";
export const usersUpdateList = (payload, meta = {}) => ({
  type: USERS_UPDATE_LIST,
  payload,
  meta
});

export const usersTogglePermissions = registerAction({
  name: "USERS_TOGGLE_PERMISSIONS",
  rootState: "permissions",
  effects: { userCanUpdateList: complement }
})


// lets register an action the new way ^ similar to the above.
export const usersUpdateList_ = registerAction({
  name: "USERS_UPDATE_LIST_V2",
  rootState: "users",
  injectRootStateTo: ["byId"],
  effects: {
    list: merge,
    //byId: computeIds,   // this cannot be done as is, we'd have to inject
    // a custom function to get `list`and compute Ids
    byId: (state) => {
      state.byId = computeIds(state.list);
      return state;
    },

    // the above functionality works but now we have to do a lot of work
    // sometimes we might need to do that for a lot of keys.
  }
});

// ideally before we hit the reducers, we can make our actions go
// through some pre-processing before the reducing step.
//
// we could have the following api
handleAction({
  name: "USERS_UPDATE_LIST_V2",
  handler: ({ permissions }, { payload }) => {
    // compute the effects that need to get merged into state
    // this allows us to potentially look at a different branch
    // in our entire state tree
    return {
      list: permissions.userCanUpdateList ? { [payload.id]: payload } : undefined
    }
  }
})
