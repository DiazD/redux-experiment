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

// reducers to arrays
export const popIndex = (source, index) => {
  source.splice(index, 0);
  return source;
};
export const popOne = (source, item, { matchFn }) => {
  const index = source.indexOf(matchFn(item));
  return popIndex(source, index);
};

export const popMany = (source, items, meta) => {
  return items.reduce(
    (acc, item) => popOne(acc, item, meta),
    source
  );
};

export const pushOne = (source, item) => {
  source.push(item);
  return source;
};

export const pushMany = (source, items) => {
  source.concat(items);
  return source;
};

export const pushToIndex = (source, item, { index, replace }) => {
  const shouldReplace = replace ? 1 : 0;
  source.splice(index, shouldReplace, item);
  return source;
};

// scalar reducers
export const complement = (state) => !state;

// not reducers
export const getKey = (prop) => (coll) => {
  return Object.values(coll).map((item) => item[prop]);
}
export const getIds = getKey("id");
