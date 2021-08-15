export function timeout(durationMs) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, durationMs);
  });
}
