import { produce } from "immer";
import { updateIn, getIn } from "./utils";
import { effects } from "./actionHandler";

// initial states
import { phonebookInitialState } from "./phonebook";
import { userInitialState } from "./users";
import { addressInitialState } from "./address";
import { archiveInitialState } from "./archive";

// ui initial states
import { uiUsersState } from "./ui/users";

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
  ui: {
    usersList: uiUsersState,
  }
}
// imagine adding a lot of cases and creating multiple reducers
// adding more action types and actions and reducers is a lot of
// boilerplate.

// lets create an abstraction to help us do most of these things.
const createReducer = (initialState) => produce(
  (base, action) => {
    const { payload = {}, meta } = action;
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

        // ignore this reducer if the path is undefined
        // meaning another reducer should handle it.
        if (getIn(statePath, base) !== undefined) {
          const { effects: effectsOverride = {} } = meta;
          const handler = effectsOverride[path] || reductionFn

          // update the state based on the path
          updateIn(statePath, base, handler, payload[path], meta);
        }
      })
    }
  },
  initialState,
)

// Handles normalized data
export const db = createReducer(initialState);

// Handles shared state between components
export const ui = createReducer(initialState);
