import _ from 'lodash';

export default Object.freeze({
  true: tilltrue,
  first
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
