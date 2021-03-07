import { bulkRegisterActions } from "../actionHandler"
import { popOne, pushMany } from "../commonReducers";
import { matchByEq } from "../utils";

export const actions = bulkRegisterActions({
  actions: {
    removeUser: {
      name: "ARCHIVE_LIST_REMOVE_ONE",
      effects: { archive: popOne },
      meta: { matchFn: matchByEq }
    },
    updateUsersList: {
      name: "ARCHIVE_UPDATE_LIST",
      effects: { archive: pushMany },
    },
  },
});
