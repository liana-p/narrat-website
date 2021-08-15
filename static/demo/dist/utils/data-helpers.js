export function findDataHelper(sourceObj, path) {
  const keys = path.split(".");
  let obj = sourceObj;
  const end = keys.length - 1;
  let key = keys[0];
  let i = 0;
  for (i = 0; i < end; i++) {
    key = keys[i];
    if (!obj[key]) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  key = keys[i];
  return [obj, key];
}
export function setDataHelper(sourceObj, path, value) {
  const [obj, key] = findDataHelper(sourceObj, path);
  obj[key] = value;
}
