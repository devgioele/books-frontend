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
FULL = no free space
NOT_ENOUGH = not enough items
ENOUGH = enough items and there is still free space
 */
export const fillingState = createEnum(['FULL', 'NOT_ENOUGH', 'ENOUGH']);
export const computeFillingState = (min, max, value) => {
  if (value === max) {
    return fillingState.FULL;
  }
  if (value < min) {
    return fillingState.NOT_ENOUGH;
  }
  return fillingState.ENOUGH;
};
