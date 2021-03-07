import { createSelectors } from "../utils";
import { getIds } from "../commonReducers";

// NOTE: Experimental, using bulkCreateSelectors
// I think using createSelector and createCachedSelector
// will be the better way to go
export const selectors = createSelectors({
  basePath: ["db"],
  selectors: {
    getUsersSelector: { path: "users" },     // non cached selector
    getUsersArraySelector: [
      ({ db }) => db.users,
      (users) => Object.values(users),
    ],// non cached selector
    getUserIdsSelector: [                    // cached selector
      ({ db }) => db.users,
      (users) => getIds(users),
    ]
  }
});
