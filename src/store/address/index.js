import { actions } from "./actions";
import { parseData } from "../loadData";

export const addressInitialState = parseData().address;
const address = {
  actions
};

export default address;
