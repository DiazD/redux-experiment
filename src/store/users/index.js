import { actions } from "./actions";
import { selectors } from "./selectors";

import { parseData } from "../loadData";

export const userInitialState = parseData().users;

const users = {
  actions,
  selectors,
};

export default users;
