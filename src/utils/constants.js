function createEnum(values) {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}

export const bookConditions = createEnum(['great', 'good', 'ok', 'bad', 'na']);
export const uploadProgress = createEnum(['waiting', 'uploading', 'uploaded']);
export const axiosState = createEnum(['progress', 'success', 'error', 'abort']);
/*
full = no free space
notEnough = not enough items
enough = enough items and there is still free space
 */
export const fillingState = createEnum(['full', 'notEnough', 'enough']);
export const computeFillingState = (min, max, value) => {
  if (value === max) {
    return fillingState.full;
  }
  if (value < min) {
    return fillingState.notEnough;
  }
  return fillingState.enough;
};
