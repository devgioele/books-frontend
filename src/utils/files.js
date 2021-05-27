export function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function cleanBase64(base64) {
  // Remove metadata from the beginning
  let encoded = base64.replace(/^data:(.*,)?/, '');
  // Padding such that the length of the string is a multiple of 4
  if (encoded.length % 4 > 0) encoded += '='.repeat(4 - (encoded.length % 4));
  return encoded;
}

// The prefix of the id is changed until it passes the test with
// the given verifier function 'isNotUnique'.
export function makeUnique(isNotUnique, id) {
  let num = 0;
  let prefix = '';
  let result = id;

  while (isNotUnique(result)) {
    num += 1;
    prefix = ` - ${num}`;
    result = id + prefix;
  }

  return result;
}

export function makeFilenameUnique(isNotUnique, filename) {
  const extensionStart = filename.lastIndexOf('.');
  const name = filename.slice(0, extensionStart);
  const extension = filename.slice(extensionStart);

  let num = 0;
  let prefix = '';
  let result = filename;

  while (isNotUnique(result)) {
    num += 1;
    prefix = ` - ${num}`;
    result = name + prefix + extension;
  }

  return result;
}
