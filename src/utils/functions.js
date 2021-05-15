import { useEffect } from 'react';

export const debounce = (func, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
};

export function useAsync(asyncFn, onSuccess, onFailure) {
  useEffect(() => {
    let isMounted = true;
    asyncFn().then((data) => {
      if (isMounted) onSuccess(data);
    });
    return () => {
      isMounted = false;
    };
  }, [asyncFn, onSuccess]);
}

export function getFromObject(object, key) {
  const keys = key.split('.');
  return keys.reduce(
    (prevObject, currentKey) =>
      prevObject ? prevObject[currentKey] : undefined,
    object
  );
}

export function buildObjectFromFields(fields) {
  return fields.reduce(
    (object, field) => ({
      ...object,
      [field.name]: field.data,
    }),
    {}
  );
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function deriveObject(key, value) {
  const keys = key.split('.');
  const singleKey = keys.pop();

  const object = {};
  let currentObject = object;

  keys.forEach((currentKey) => {
    currentObject[currentKey] = {};
    currentObject = currentObject[currentKey];
  });

  currentObject[singleKey] = value;

  return object;
}

export function imprintObject(object) {
  const keys = Object.keys(object);
  return keys.reduce(
    (imprintedObj, key) =>
      mergeDeep(imprintedObj, deriveObject(key, object[key])),
    {}
  );
}
