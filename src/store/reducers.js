import { produce } from "immer";
import { updateIn } from "./utils";
import { effects } from "./actionHandler";

// different actions
import { phonebookInitialState } from "./phonebook";
import { userInitialState } from "./users";
import { addressInitialState } from "./address";
import { archiveInitialState } from "./archive";

// TODO: move permissions to it's own folder
const permissions = {
  userCanUpdateList: true,
};
export const initialState = {
  db: {
    users: userInitialState,
    permissions: permissions,
    phonebooks: phonebookInitialState,
    address: addressInitialState,
    archive: archiveInitialState,
  },
};

export const rootDbPath = "db";

// imagine adding a lot of cases and creating multiple reducers
// adding more action types and actions and reducers is a lot of
// boilerplate.

// lets create an abstraction to help us do most of these things.
const reducer = produce(
  (base, action) => {
    const { payload, meta } = action;
    const {
      effects: _effects,
      rootState,
      injectRootStateTo,
    } = effects[action.type] || {};

    if (_effects) {
      let basePath = rootState ? [rootState] : [];
      Object.entries(_effects).forEach(([path, reductionFn]) => {
        // lets calculate the path we need to work on
        const statePath = injectRootStateTo.includes(path) ? basePath : [...basePath, path];

        const { effects: effectsOverride = {} } = meta;
        const handler = effectsOverride[path] || reductionFn

        // update the state based on the path
        updateIn(statePath, base, handler, payload[path], meta);
      })
    }
  },
  initialState
);


export default reducer;
