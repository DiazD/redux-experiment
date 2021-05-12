import { bulkRegisterActions } from "../actionHandler"
import { handleAction } from "../middlewares/actionHandlerMiddleware";
import { shallowMerge as merge } from "../commonReducers";
import { normalizeOne } from "../utils";

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
    family: normalizeOne(payload),
  })
});

handleAction({
  name: "UPDATE_WORK_PHONEBOOK",
  handler: (_, { payload }) => ({
    work: normalizeOne(payload),
  })
});
