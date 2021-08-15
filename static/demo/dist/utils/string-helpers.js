export function processText(store, text) {
  return text.replace(/%{[^}]*}/g, (match) => {
    const key = match.substr(2, match.length - 3);
    return store.state.machine.data[key];
  });
}
