export function debounce(func, waitMilliseconds = 50, options = {}) {
  let timeoutId;
  const isImmediate = options.isImmediate ?? false;
  const callback = options.callback ?? false;
  const maxWait = options.maxWait;
  let lastInvokeTime = Date.now();
  let promises = [];
  function nextInvokeTimeout() {
    if (maxWait !== void 0) {
      const timeSinceLastInvocation = Date.now() - lastInvokeTime;
      if (timeSinceLastInvocation + waitMilliseconds >= maxWait) {
        return maxWait - timeSinceLastInvocation;
      }
    }
    return waitMilliseconds;
  }
  const debouncedFunction = function(...args) {
    const context = this;
    return new Promise((resolve, reject) => {
      const invokeFunction = function() {
        timeoutId = void 0;
        lastInvokeTime = Date.now();
        if (!isImmediate) {
          const result = func.apply(context, args);
          callback && callback(result);
          promises.forEach(({resolve: resolve2}) => resolve2(result));
          promises = [];
        }
      };
      const shouldCallNow = isImmediate && timeoutId === void 0;
      if (timeoutId !== void 0) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(invokeFunction, nextInvokeTimeout());
      if (shouldCallNow) {
        const result = func.apply(context, args);
        callback && callback(result);
        return resolve(result);
      }
      promises.push({resolve, reject});
    });
  };
  debouncedFunction.cancel = function(reason) {
    if (timeoutId !== void 0) {
      clearTimeout(timeoutId);
    }
    promises.forEach(({reject}) => reject(reason));
    promises = [];
  };
  return debouncedFunction;
}
