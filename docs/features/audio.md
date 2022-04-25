# Playing Audio (sounds and music)

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

Once there are audio files loaded in the engine, audio can be played with the `play` function at any time in the script:

`play music musicName`

Playing with mode `music` will replace stop and replace the current music to play a new one. There is only one music playing at a time

`play sound soundName`

Playing with the mode `sound` will just play a sound, no matter what else is already playing.

See the play function documentation {% page-ref page="play-function.md %}
