import { produce } from "immer";
import { updateIn } from "./utils";

const users = {
  list: {},
  byId: [],
}

const permissions = {
  userCanUpdateList: true,
};

export const initialState = {
  root: { users, permissions }
};

export const effects = {};  // the effects register that will be used  by root reducer

// imagine adding a lot of cases and creating multiple reducers
// adding more action types and actions and reducers is a lot of
// boilerplate.

// lets create an abstraction to help us do most of these things.
const reducer = produce(
  (base, action) => {
    // NEW WAY
    const { payload, meta } = action;
    const {
      effects: _effects,
      rootState,
      injectRootStateTo,
    } = effects[action.type] || {};

    if (_effects) {
      let basePath = [rootState];
      Object.entries(_effects).map(([path, reductionFn]) => {
        // lets calculate the path we need to work on
        const statePath = injectRootStateTo.includes(path) ? basePath : [...basePath, path];

        // TODO: add a new api to `meta` to allow injection of new
        // reducing function

        // update the state based on the path
        console.log("BOOOOM", statePath, reductionFn);
        updateIn(statePath, base, reductionFn, payload[path], meta);
        console.log("BASE", JSON.parse(JSON.stringify(base)));
      })
    }
  },
  initialState
);


export default reducer;
