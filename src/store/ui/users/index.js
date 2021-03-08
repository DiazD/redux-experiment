import { actions } from "./actions";
import * as selectors from "./selectors";

export const uiUsersState = {
  canDelete: true,
};

const uiUsers = {
  actions,
  selectors,
};

export default uiUsers;
