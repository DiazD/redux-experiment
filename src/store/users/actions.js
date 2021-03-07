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

// Problems with coeffects
// part of the problem is that lets say that we fire off
// remove-one from users-list.  We'll want to add a coeffect
// to update the archive list with the payload we just passed
//
// however our payload is in the shape of { users: <pk> }
// while archive-update-list requires a paylaod of { archive: [<ids>] }
//
// so how would the logic work to take the payload
// { users: <pk> } and turn it into { archive: [<pks>] }
//
//
