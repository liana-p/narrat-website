---
date: "2022-07-01T19:40:32.169Z"
slug: "narrat-2-0-0"
title: "Narrat 2.0.0"
categories:
  - News
---

### What changed in narrat 2.0

Narrat has a **new language syntax** in 2.0.0 - The parser has been improved to turn the narrat scripting into a full programming language with support for expressions, variables and functions

The syntax is generally the same so existing scripts would mostly work, except for the use of `$if` (which used to be a hack by sending your code to JavaScript [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)).

### Script updating tool

There is a [script updating tool](https://github.com/liana-pigeot/Narrat-Script-Updater) which can be used to help automatically update existing scripts from 1.x to work with the new syntax.

{% hint style="danger" %}
The old syntax is largely compatible, but the $if instruction works very differently now. The script will update those $if instructions to match the new system, but might fail at updating long series of conditions in $if
{% endhint %}

### Installing narrat 2.0

Narrat 2.0 is currently published under a different tag to avoid people on 1.x accidentally installing it.

To install narrat to, run `npm install narrat@next`. The `next` tag is where the latest 2.x version is published.

### Expressions

Expressions are now a first party feature. An expression is any operation between parenthesis. Any command in the game can be used as an expression, if it returns a value. For example `(+ 2 3)` is an expression that would get evaluated to `5`.

### Syntax for using commands

The syntax for using commands hasn't changed, but it's been formalised.

The format for any operation is `[operator] [arg1] [arg2] [arg3] ...`. Operator is the command's keyword (like `talk`, `set`, `if` etc).

For example:

`set data.player.score 3` is the operator `set` with arguments `data.player.score` and `3`.

`set data.player.score (+ $data.player.score 2)`

The first command would set `3` in `data.player.score`.

The second command is also a set on `data.player.score`, but the second argument (the value) is an expression itself: `(+ $data.player.score 2)`. So the final resulting command is effectively `set data.player.score 5`.

### Using Variables

To use a variable's value in a command, prefix its name with `$` as in the example above. In the case of the `set` command, we want to pass to set the variable's name, not its value, so we don't use `$` at the start.

Variables are also available in string interpolation as before, to insert variables in text:

`talk player idle "Hello %{data.player.name}"`

### New If syntax

The previous `$if` is gone, now `if` is a command itself, which takes one argument: the condition. If the condition is true it plays the next branch, and it can have an optional else branch.

Example:

```py
set data.age 25
if (> $data.age 18):
  "The player is an adult"
else:
  "The player is not an adult"
```

#### More details on syntax and expressions

More complex example:

```py
main:
  set data.winThreshold 10
  set data.player.score 5
  set data.player.scoreBonus 5
  if (== (+ $data.player.score $data.player.scoreBonus) $data.winThreshold):
    "The player won!"
```

In this example, the script stores a few variables, and then uses them in an `if` to compare their value. The `==` operation returns true if all arguments are equal, while the `+` operation adds values together and returns the result.

Here's how the code above would get broken down as the expressions get calculated:

```py
if (== (+ $player.score $player.scoreBonus) $data.winThreshold):
if (== 10 $data.winThreshold):
if (== 10 10):
if true
```

### New operators

A lot of new operators have been added to be able to perform basic operations with the new scripting system:

- `+`, `-`, `*`, `/` : Will add/substract/etc arguments passed and return the value. Can take infinite arguments
- `||` and `&&` : Will or/and all arguments passed and return true or false. Inifinite arguments
- `>`, `>=`, `<`, `<=`, `==`, `!=` : Compares arguments 1 and 2, returns true or false. Note: equality uses truthy equality, not strict equality
- `!`: Negates argument 1
- `?`: Ternary operation. Arg 1 is the condition, 2 is what gets returned on success, 3 what gets returned on failure

### New helper functions

New helper functions for easily checking quests and inventory without long lines:

- `quest_completed? [questId]`: Returns true if the quest `questId` is completed
- `objective_completed? [questId] [objectiveId]`: Same for an objective
- Also quest_started and `objective_started`
- `has_item? [itemId] [amount (optional)]`: Returns true if the player has an item (if amount is passed, the player needs to have amount or more of it)
- `item_amount? [itemId]` Returns how many of an item the player has.

### Local variables

Local variables can now be declared. They exist inside the scope in which they are declared. Example

```python
main:
  run variables_test
  "The variable 'test' is now undefined because we left the scope it was created in: %{test}"

variables_test:
  var test 1
  "Test value is %{test}"
```

### Function with arguments and return values

Labels are now "functions" and can take arguments or return values.

Example:

```renpy
main:
  var meal (run_label takeout_menu Cake)
  "The player chose to eat %{meal}"

takeout_menu third_option:
  var meal ""
  choice:
    talk helper idle "Which meal do you want?"
    "Pizza":
      set meal pizza
    "Burger":
      set meal burger
    "%{third_option}":
      set meal $third_option
  talk helper idle "Chosen %{meal}"
  return $meal

```

### Other new features

#### Audio triggers

New audio triggers feature to play sounds on certain events in the game.

Simply add the sounds to the config:

```json
  "audioTriggers": {
    "onPlayerAnswered": "click",
    "onPressStart": "game_start",
    "onSkillCheckFailure": "failure",
    "onSkillCheckSuccess": "success"
  }
```

Keys are event names, and values are the id of an audio you've defined in the config. For now all the available events are the ones above. Once defined, the sound will play every time that event is triggered.
