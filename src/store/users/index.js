import { updateUsersList } from "./actions";
import { selectors } from "./selectors";

import { parseData } from "../loadData";

export const userInitialState = parseData().users;

const users = {
  actions: { updateUsersList },
  selectors,
};

export default users;
