import { createSelectors } from "../utils";
import { getIds } from "../commonReducers";

export const selectors = createSelectors({
  basePath: ["db"],
  selectors: {
    getUsersSelector: { path: "address" },     // non cached selector
    getUsersArraySelector: { path: "address" },// non cached selector
    getUserIdsSelector: [                    // cached selector
      ({ db }) => db.address,
      (users) => getIds(users),
    ]
  }
});
