# Roll

The `roll` command in narrat performs a passive skill check which can be used inside a condition so that the condition will only happen if the skill check succeeds.

Syntax: `roll [skillCheckId] [SkillId] [difficultyValue] [hideAfterRoll (optional]`

### Example

```
main:
  if (roll mySkillCheckId agility 50):
    "You managed to climb over the fence"
  else:
    "You fell down"
```

### Options details

* `skillCheckId`: Any text can be used as a skill check id. This id will be used to save that this specific skill check happened, and its value. If that dialogue gets replayed, the game will know what the result was.
* `skillId`: The id of the skill to test on
* `difficultyValue`: The difficulty of the skill check. By default skill checks are a roll between 0 and 100, with the player's skill level increasing the roll. `difficultyValue` is the score to beat.
* `hideAfterRoll`: Optional, if set to true, it will make the skill check be hidden and skipped next time it is used (useful for skill checks in choices, to make the option disappear)
