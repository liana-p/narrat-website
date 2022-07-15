---
date: "2022-07-15"
slug: "narrat-2.1.0"
title: "Narrat 2.1.0"
categories:
  - News
---

Here are all the new features from the changelog since 2.0.0

## 2.1.1

fix: The `text` command (default command for printing text without using `talk`) was adding quotes around text since 2.0.0. This is now fixed.

## 2.1.0

### ⚠️ Breaking Change ⚠️

Narrat has been updated to use [vite 3](https://vitejs.dev/blog/announcing-vite3.html#the-ecosystem-is-ready-for-v3). The only breaking change is that the path of the narrat CSS file has changed:

In the game's `index.ts` the import of CSS needs to change. Before:

`import 'narrat/dist/lib.css';`

After:

`import "narrat/dist/style.css";`

Many new features, TODO: fill changelog.

### Data shorthand

It is now no longer necessary to prefix things with `data` when setting or getting variables.

For example `set player.name` is equivalent to `set data.player.name`.

The way the system works when looking up variables is:

- Return if there's a base variable in the lookup state matching (for example `data`, `skills` etc)
- Otherwise if a variable exists in the local scope (created with `var`) use that
- Otherwise default to assuming we're editing something inside `data`

### New example RPG game

There is now an example [dungeon crawler turn based RPG](https://github.com/liana-p/narrat/tree/main/examples/rpg) game made as a test to push the engine and scripting features. It is not meant to be a full game, but can be a useful reference for advanced usage.

### Anchor feature for buttons

There is now an optional `anchor` property for buttons, useful for anchoring a buttom from its center or any other place.

Example:

```json
{
  "buttons": {
    "go_front": {
      "enabled": false,
      "background": "img/ui/front.png",
      "position": {
        "left": 440,
        "top": 120,
        "width": 96,
        "height": 96
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      },
      "action": "choose_front"
    }
  }
}
```

### Base assets path

There is now a way to pass a base assets path to narrat, which will be prepended to the path of any assets that need to be loaded by the engine (this was needed to implement the multiple demos in a single repo).

The option is `baseAssetsPath` which can be passed in the first options object of `startApp`.

See the `demo.ts` file for an example of how to use it.

### Game examples now in the repo

The repo has been restructures to allow having multiple example games directly inside it.

The `examples/` folder contains a subfolder for each demo game, where the data/asset files for a game can be placed.

To run an example game, the dev script needs to be run with a special environment variable pointing to the path of the game to run. For example, a command has been added to run the rpg game:

`npm run rpg` -> Runs `cross-env VITE_EXAMPLE=examples/rpg npx vite dev`

Demo games can also be built from the repo. For example:

`npm run build-rpg` -> Runs `cross-env VITE_DEMO_BUILD=rpg npx vite build && shx cp -r examples/rpg/* built-example/rpg`. The built game is then available in the `built-example/rpg` folder.

### New commands

Added a lot of new commands while making the RPG example.

#### Math operations

- Negate numbers: `neg 1` -> returns -1
- Absolute function: `abs -1` -> returns 1
- Min - returns lowest passed number: `min 1 2` -> returns 1
- Max - returns highest passed number: `max 1 2` -> returns 2
- Clamp - returns number between min and max: `clamp 1 2 3` -> returns 2 (syntax: `clamp [min] [max] [value]`)

#### Random generation

- Random number: `random 1 10` -> returns an **integer** random number between 1 and 10 (inclusive)
- Random float: `random_float 1 10` -> returns a float between 1 and 10
- Random from args: `random_from_args "a thing" "another thing" 2 "things can be any value"` -> returns a random item from the list of arguments

#### Strings

- Concat: `concat "a" "b"` -> returns "ab" (Syntax: `concat [string1] [string2] [string3]...`)
- Join: `join ", " "a" "b"` -> returns "a, b" (Syntax: `join [separator] [item1] [item2] [item3] ...`)

#### Skills

- Set level: `set_level agility 1` -> sets the level of the skill "agility" to 1
- Get level: `get_level agility` -> returns the level of the skill "agility"
- Get xp: `get_xp agility` -> returns the xp of the skill "agility"

#### Utility

- Log: `log $someVariable` -> logs the value of the variable $someVariable to the console (Syntax: `log [value1] [value2] [value3]...`). Can be used to log anything for debugging

## 2.0.12

New layers feature: Multiple screens can be overlaid on top of each other in layers.

Layers are defined by their number, being displayed from 0 to x. By default, the `set_screen` command sets a screen on the first layer, as it did before. To set a screen on a different layer, pass the layer number as a second parameter.

```py
set_screen my_screen 1
// do stuff, then remove the overlay
empty_layer 1
```

## 2.0.11

feature: The left-side viewport now uses DOM instead of canvas so screens and buttons can use animated gifs or webp.

The config has optionally been made easier to edit, with no need to define images in the `images` part of the config. buttons can also now be optionally defined inside the screen directly. The config is still compatible with the old syntax.

Example:

```json
{
  "screens": {
    "default": {
      "background": "narrat"
    },
    "map": {
      "background": "img/backgrounds/map.png",
      "buttons": [
        {
          "id": "shopButton",
          "enabled": false,
          "background": "img/ui/shop-button.png",
          "position": {
            "left": 38,
            "top": 6,
            "width": 255,
            "height": 226
          },
          "action": "shopButton"
        },
        {
          "id": "parkButton",
          "enabled": false,
          "background": "img/ui/park-button.png",
          "position": {
            "left": 632,
            "top": 86,
            "width": 255,
            "height": 226
          },
          "action": "parkButton"
        }
      ]
    }
  }
}
```

## 2.0.10

fix: `quest_completed?` now returns the correct value

## 2.0.9

Internal engine changes, shouldn't impact users.

Refactor to the VM and commands system to handle the way the stack flows better. Commands don't have to call `nextLine` on the VM to run the next line, instead the VM properly knows when a command is truly finished and controls the program's flow.

Also renamed `stacks` to `frames`, as the stack is the array that contains the frames and this was confusing.

## 2.0.8

- Fix: Auto scrolling when new text is added now works properly
- Fix: error when using set_stat or add_stat with a value of 0

## 2.0.7

Fixed an error where the `roll` function always returned true even if the skill check failed

## 2.0.6

Fixed a reggression bug introduced in 2.x where player choices weren't printed anymore in the dialogue history after making a choice.

## 2.0.4

Fixed more audio edge cases around race conditions

## 2.0.1

Fixed audio bug around loading

### New feature: Text Fields

New text fields feature to let players type answers to questions.

Usage: `text_field [prompt]`

Example:

```py
main:
  set player.name (text_field "Enter your name")
  "Your name is %{playerName}"
```
