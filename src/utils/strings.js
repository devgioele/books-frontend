// The prefix of the id is changed until it passes the test with
// the given verifier function 'isNotUnique'.
export default function makeUnique(isNotUnique, id) {
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
