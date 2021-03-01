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


// immer hack to be able to view our state during `produce`
// otherwise we see proxy
export const printState = (state) => JSON.parse(JSON.stringify(state));
