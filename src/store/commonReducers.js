export const replace = (_, newValue) => newValue;
export const shallowMerge = (source, newValue) => ({ ...source, ...newValue });
export const deepMerge = (source, newValue) => {
  Object.entries(newValue).reduce(
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
export const getKey = (prop) => (coll) => {
  return Object.values(coll).map((item) => item[prop]);
}
export const getIds = getKey("id");
export const complement = (state) => !state;
