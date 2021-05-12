import { bulkRegisterActions } from "../actionHandler"
import {
  shallowMerge as merge,
  insertOrUpdateOne,
} from "../commonReducers";

export const actions = bulkRegisterActions({
  actions: {
    updateAddressList: {
      name: "ADDRESS_UPDATE_LIST",
      effects: { address: merge }
    },
    updateOneAddress: {
      name: "ADDRESS_UPDATE_ONE",
      effects: { address: insertOrUpdateOne }
    }
  }
});
