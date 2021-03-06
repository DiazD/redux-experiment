export const replace = (_, newValue) => newValue;

// map reducers
export const shallowMerge = (source, newValue) => ({ ...source, ...newValue });
export const deepMerge = (source, newValue) => {
  return Object.entries(newValue).reduce(
    (acc, [key, value]) => {
      const existingValue = acc[key];

      if (existingValue) {
        acc[key] = { ...existingValue, value };
      } else {
        acc[key] = value;
      }
      return acc;
    },
    source,
  );
};
export const insertOrUpdateOne = (source, newValue) => {
  // we default to merge to avoid having 2 functions
  const existing = source[newValue.id] || {};
  source[newValue.id] = { ...existing, ...newValue };
  return source;
};
export const partialUpdateOne = (source, partialValue) => {
  const existing = source[partialValue.id];
  // only merge if it exists
  if (existing) {
    return insertOrUpdateOne(source, partialValue);
  }
  return source;
};
export const removeOne = (source, id) => {
  delete source[id];
  return source;
};
export const removeMany = (source, ids) => {
  return ids.reduce(removeOne, source);
}

// scalar reducers
export const complement = (state) => !state;

// not reducers
export const getKey = (prop) => (coll) => {
  return Object.values(coll).map((item) => item[prop]);
}
export const getIds = getKey("id");
