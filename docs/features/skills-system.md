---
description: >-
  The skills system in narrat allows to run random skillchecks (think D&D dice
  roll) compared against the player's level in a particular skill
---

# Skills System

## Skills Introduction

A narrat game can have any number of skills which the player can gain xp and levels for.

Those skills can then be used in skill checks in two ways:

* In a dialog choice, some choices can trigger a skill check with different outcomes depending on success or failures
* Skill checks can also happen passively as conditions in the script to trigger extra content. In those cases, a message appears in the dialogue informing the player that a skill check has just happened, but it wasn't initiated by an intentional player choice.

## What it looks like

![](<../.gitbook/assets/image (8).png>)Passive Skill check

The difficulty of the skill check depends on a combination of how hard the skill check is configured to be, and the level of the player in this particular skill

Skill check in a choice:

![](<../.gitbook/assets/image (6).png>)

![](<../.gitbook/assets/image (5).png>)

## How it works

### Skills configuration

Skills are configured in `config.json`:

```json
{
  "skills": {
    "agility": {
      "name": "Agility",
      "description": "How good you are at moving around.",
      "startingLevel": 0,
      "icon": "img/skills/agility.jpg",
      "hidden": true
    },
    "logic": {
      "name": "Logic",
      "description": "How good you are at solving problems",
      "icon": "img/skills/logic.jpg",
      "startingLevel": 0
    }
  }
}
```

Each skill needs to have a name, description, startingLevel, and icon (for display in the skills screen).

The `hidden` option is an optional way to make a skill stay hidden in the skill screen until it reaches level 1. This allows keeping a skill hidden from the player if its existence is a spoiler until it is unlocked.

```json
{
  "skillOptions": {
    "xpPerLevel": 10
  }
}
```

The `skillOptions` object contains global options about skills in general. For now this only contains the `xpPerLevel` option, which defines how many XP points a player needs to gain to level up in a skill. XP is currently linear and the same for all skills

### Skill Checks

#### System explanation

Skill checks work in the following way:

1. The engine generates a "dice roll" between 0 and `rollRange` (default 100)
2. The skill check's difficulty value is the roll to beat. For example a skill check with a difficulty of 90 means that the dice roll needs to be above 90, or about 10% chance of success.
3. Each level the player has in the corresponding skill adds extra points to their roll, that are multiplied by `skillMultiplier` (default: 10)
4. There is an optional `failureChance` value, below which any roll will automatically fail.
5. Each skill check has its own `id` which allows the engine to save the state of each skill check

```json
{
  "skillChecks": {
    "rollRange": 100,
    "skillMultiplier": 10,
    "failureChance": 1,
    "difficultyText": [
      [0, "Very Easy"],
      [10, "Easy"],
      [30, "Medium"],
      [50, "Hard"],
      [70, "Very Hard"],
      [80, "Extremely Hard"],
      [90, "Near Impossible"]
    ]
  }
}
```

Practical example:

```renpy
roll aSkillCheck agility 70 "Try jumping!" hideAfterRoll:
```

This skill check uses the agility skill. It has a difficulty of 70.

Let's say the dice roll gives us 53. The player's level in agility is 3, and `skillMultiplier` is 10, so 30 gets added to the roll. This means the total roll of the player is 83.

Because 83 is above 70, the skill check is successful.

{% hint style="info" %}
The `difficultyText` config array specifies a list of thresholds and the corresponding difficulty text to show when the skill check's difficulty is past that threshold. It can have any amount of thresholds with any values. The choice for which text to print takes into account the player's current skill level and multiplier to reflect the real difficulty
{% endhint %}

## Usage syntax

### Passive skill check

```renpy
  $if this.roll("someSkillCheck", "agility", 40): // You can use skillchecks in conditions
    "This line only appears if you passed a hidden passive skill check"
```

Passive skill checks are done by calling the `roll` function inside a `$if` command.

The roll function takes the following parameters:

1. `skillCheckId`: Each skill check needs its own id so that the game can save whether it was successful or not. This can be any value
2. `skillId`: The id of the skill to use in this skill check (as configured in your skills config)
3. `difficulty`: The score to beat to pass the skill check, defining how hard it is. With the default settings of rolls being 0 and 100, and a player at level 0, a difficulty of 50 would mean 50% chance of success by default.

If the skill check succeeds, the branch inside the if command will be run. A message will also be printed in the dialogue to inform the player that a skill check happened.

### Active skill check (in choices)

```renpy
choice:
    "Should we try jumping over a fence?"
    roll fenceJump agility 70 "Try jumping!" hideAfterRoll:
      success:
        "You graciously jump over a fence, hair blowing in the wind, and land in a heroic pose that would be used in a movie trailer."
        talk inner idle "Woo I did it!!!"
      failure:
        "You try jumping over the fence, but not high enough. You stab your toe against the fence and fall head first into a puddle of mud. It's also in the background of a tiktok a passerby was filming now."
        talk inner idle "Ouch!"
    "No I'm a coward, I'd rather not":
      "Well okay then"
```

Active skill checks happen in a `choice` command, as one of the options the player can choose.

The syntax is `roll [skillCheckId] [skillId] [difficulty] [promptText] [optional hideAfterRoll]:`

The first settings are the same as previously. The others:

* `promptText` is the text that will appear as the prompt for that choice
* the optional `hideAfterRoll` option can be added at the end of a the skill check to make this option disappear from the choice if it's been played once. This is useful if the skill check is inside a "menu dialogue" where you want this option to hide after the skill check has been attempted.

Then, there is a `success`  branch and a `failure` branch inside the roll. The engine will go to one of those depending on the result.

