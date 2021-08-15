import {Howl} from "../../_snowpack/pkg/howler.js";
import {error} from "./error-handling.js";
export const audio = {
  sound: {},
  music: {}
};
export async function loadAudioAssets(config) {
  console.log(`Loading audio`);
  const loadingPromises = [];
  for (const key in config.sound) {
    const path = config.sound[key].path;
    loadingPromises.push(loadAudio(key, path, audio.sound));
  }
  for (const key in config.music) {
    const path = config.music[key].path;
    loadingPromises.push(loadAudio(key, path, audio.music));
  }
  return Promise.all(loadingPromises);
}
export async function loadAudio(key, path, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Loading audio ${path}`);
    const sound = new Howl({
      src: [path]
    });
    sound.load();
    dest[key] = sound;
    resolve();
  });
}
export function changeMusic(ctx, newMusic) {
  if (ctx.state.audio.currentMusic) {
    const oldMusic = getMusic(ctx.state.audio.currentMusic);
    if (oldMusic) {
      oldMusic.stop();
    }
  }
  ctx.commit("setMusic", newMusic);
  if (newMusic) {
    playMusic(ctx.commit, newMusic);
  }
}
export function playMusic(commit, key) {
  const music = getMusic(key);
  if (music) {
    music.play();
  } else {
    error(commit, `Music ${key} not found!`);
  }
}
export function playSound(commit, key) {
  const sound = getSound(key);
  if (sound) {
    sound.play();
  } else {
    error(commit, `Sound effect ${key} not found!`);
  }
}
export function getMusic(key) {
  return audio.music[key];
}
export function getSound(key) {
  return audio.sound[key];
}
