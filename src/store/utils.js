import { createSelector as cs } from "reselect";

export const getIn = (path, map, defaultValue = undefined) => {
  return path.reduce((acc, step) => {
    if (acc[step] === undefined || !acc || acc === undefined) return defaultValue;
    return acc[step];
  }, map);
};

export const updateIn = (path, map, reducingFn, ...extraArgs) => {
  const currentValue = getIn(path, map);
  const newValue = reducingFn(currentValue, ...extraArgs);
  const lastKey = path[path.length - 1];
  const parent = getIn(path.slice(0, -1), map);
  parent[lastKey] = newValue;
};

// selectors helper
export const createCachedSelector = cs;
export const createSelector =
  (path, transformationFn = identity) =>
    (state) => transformationFn(getIn(path, state));

// NOTE: Unsure if I like this or not
export const createSelectors = ({ basePath, selectors }) => {
  const selectors_ = {};

  Object.entries(selectors).forEach(([fnName, selector]) => {
    let selectorFn;
    if (Array.isArray(selector)) {
      selectorFn = createCachedSelector(...selector);
    } else {
      selectorFn = createSelector(
        [...basePath, selector.path],
        selector.fn
      )
    }
    selectors_[fnName] = selectorFn;
  });
  return selectors_;
}

// immer hack to be able to view our state during `produce`
// otherwise we see proxy
export const printState = (state) => JSON.parse(JSON.stringify(state));

export const identity = (x) => x;

export const normalizeOne = (item) => ({ [item.id]: item });

export const normalize = (coll) =>
  coll.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

// potentially different use cases
// in case we save items in an array for some reason
export const matchByEq = (payload) => (item) => payload === item;
export const matchById = ({ id: pid }) => ({ id }) => pid === id;
export const matchByPayloadId = ({ id }) => (item) => id === item;
export const matchByItemId = (payload) => ({ id }) => payload === id;
