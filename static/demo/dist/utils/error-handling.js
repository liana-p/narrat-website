export function parserError(commit, ctx, line, text) {
  const errorText = `[Parser Error] in <span class="error-filename">${ctx.fileName}:${line + 1}</span> - <b>${text}</b>`;
  error(commit, errorText);
}
export function error(commit, text) {
  commit("createError", `❌ ${text}`);
  console.error(text);
}
