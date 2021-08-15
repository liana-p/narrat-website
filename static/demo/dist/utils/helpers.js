export function aspectRatioFit(screenWidth, screenHeight, gameWidth, gameHeight) {
  const widthRatio = screenWidth / gameWidth;
  const heightRatio = screenHeight / gameHeight;
  const bestRatio = Math.min(widthRatio, heightRatio);
  return bestRatio;
}
export function screenToCanvas(x, y, state) {
  const canvasX = x - state.leftOffset;
  const canvasY = y - state.topOffset;
  const scaledX = canvasX / state.renderRatio;
  const scaledY = canvasY / state.renderRatio;
  return {
    x: scaledX,
    y: scaledY
  };
}
export function aabb(ax, ay, aw, ah, bx, by, bw, bh) {
  return !(ax + aw < bx || ay + ah < by || ax > bx + bw || ay > by + bh);
}
