import _ from 'lodash';

export default Object.freeze({
  true: tilltrue,
  lastValid,
  first,
  select
});

export async function tilltrue(elements, ...parameters) {
  const [head, ...tail] = elements;
  if (typeof head !== 'function') {
    return;
  }
  const result = await head(...parameters);
  if (result) {
    if (_.isEmpty(tail)) {
      return result;
    }
    return await tilltrue(tail, ...parameters);
  }
  return false;
}

export async function lastValid(elements, defaultResult = null, ...parameters) {
  const [head, ...tail] = elements;
  if (typeof head !== 'function') {
    return;
  }
  const result = await head(...parameters);
  if (result) {
    if (_.isEmpty(tail)) {
      return result;
    }
    return await lastValid(tail, result, ...parameters);
  }
  return defaultResult;
}

export async function first(elements, ...parameters) {
  const [head, ...tail] = elements;
  if (typeof head !== 'function') {
    return;
  }
  const result = await head(...parameters);
  if (result !== null && result !== undefined) {
    return result;
  }
  return await first(tail, ...parameters);
}

export async function select(condition, value1, value2) {
  const result = condition ? value1 : value2;

  if (_.isFunction(result)) {
    return await result();
  }

  return result;
};
