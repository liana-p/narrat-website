let config;
export function setCharactersConfig(data) {
  config = data;
}
export function getCharacterInfo(character) {
  return config.characters[character];
}
export function getCharacterPictureUrl(character, pose) {
  const info = getCharacterInfo(character);
  if (!pose) {
    pose = "default";
  }
  if (info.sprites) {
    return `${config.config.imagesPath}${info.sprites[pose]}`;
  }
}
export function getCharacterStyle(character) {
  if (!character) {
    return {};
  }
  return getCharacterInfo(character).style || {};
}
