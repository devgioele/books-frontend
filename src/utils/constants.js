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
