import { bulkRegisterActions } from "../../actionHandler"
import { complement } from "../../commonReducers";

export const actions = bulkRegisterActions({
  rootState: "usersList",
  actions: {
    toggleCanDelete: {
      name: "UI_USERS_TOGGLE_CAN_DELETE",
      effects: { canDelete: complement },
    }
  }
});
