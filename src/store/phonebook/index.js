import { phoneActions } from "./actions";

export const phonebookInitialState = {
  family: {},
  work: {},
};

const phonebook = {
  actions: phoneActions,
};

export default phonebook;
