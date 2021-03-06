import { produce } from "immer";
import { updateIn, printState } from "./utils";

const users = {};

const phonebooks = {
  family: {},
  work: {},
}

const permissions = {
  userCanUpdateList: true,
};

export const initialState = {
  db: { users, permissions, phonebooks },
};

export const effects = {};  // the effects register that will be used  by root reducer

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
      console.log("BASE", printState(base), basePath);
      Object.entries(_effects).map(([path, reductionFn]) => {
        // lets calculate the path we need to work on
        const statePath = injectRootStateTo.includes(path) ? basePath : [...basePath, path];

        // TODO: add a new api to `meta` to allow injection of new
        // reducing function
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
