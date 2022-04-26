# Playing Audio

### Config

The `play` function plays audio, either music or sounds.

To use the `play` function, the game needs to have audio files loaded by adding them to the config file:

```
  "audio": {
    "musicName": {
      "loop": true,
      "src": "music/myMusic.mp3"
    },
    "soundName": {
      "src": "sounds/mySound.mp3"
    }
  }
```

The audio engine used is [Howler](https://howlerjs.com). Options added in the config of an audio file will also be passed to Howler. Refer to the [Howler docs](https://github.com/goldfire/howler.js#global-options) for possible options.

### Playing music or sounds

Once there are audio files loaded in the engine, audio can be played with the `play` function at any time in the script:

`play music musicName`

Playing with mode `music` will replace stop and replace the current music to play a new one. There is only one music playing at a time

`play sound soundName`

Playing with the mode `sound` will just play a sound, no matter what else is already playing.

### Stopping and pausing

It is also possible to pause or stop sounds or music:

`stop music` (no need to specify the name because there is only one music playing

`stop sound soundName` (name must be specified)

For example, one could do a dramatic pause of the music

```
play music suspense
wait 1500
pause music
play sound scary
wait 100
talk character idle "Suddenly, something happened!"
play music # resume the music
```
