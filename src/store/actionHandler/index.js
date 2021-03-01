// one way to make this work is by having our `actions` be more
// descriptive of the changes(effects) they'll make to the state.
//
// The effects will match the keys to the state we're trying to make
// changes to.  Each `action` will target a slice of the state in
// order to work like reducers.
//
// We'll have an `effects` registry that each action will inject their
// effects in order for the root reducer to handle the incoming action.
// 
//
// So the actions API will create an action for us and register the
// effects and other meta data to the effects register.
import { effects } from "../reducers";

export const registerAction = ({
  name,                     // name of our action
  rootState,                // state slice that this action targets
  injectRootStateTo = [],   // injects the state slice pointed by `rootState` rather than the state pointed by the effect attribute.
  effects: _effects,                   // an object of state key to reducing function
}) => {
  if (!name && !rootState && !_effects) {
    throw new Error(
      "name, rootState and effects are required arguments"
    );
  }

  // register the action, in our effects registry,
  // and bind it with the effects
  // the registry is read by the root reducer.
  effects[name] = {
    rootState,
    injectRootStateTo,
    effects: _effects,
  };

  // create an action
  const action = (payload = {}, meta = {}) => ({
    type: name,
    payload,
    meta,
  })
  action.toString = () => name;
  return action;
};
