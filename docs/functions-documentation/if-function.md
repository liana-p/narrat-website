# If

## if function

The `$if` command is the main method of doing conditions in narrat. It can be used to branch inside a script, or to make choice options conditionally available.

Syntax:

```renpy
$if [condition]:
  "This code is run on condition success"
else:
  "This code is run on condition failure"
```

{% hint style="info" %}
`else` is optional
{% endhint %}

If conditions have access to the following values (inside the `this` object):

* `data`: The object containing the game variables created by functions like `set` and `add`
* `skillchecks`: The object containing the state of skill checks that have been passed
* `skills`: The skills state
* `stats: HUD stats`
* `roll:` The roll function (see [skills system page](../features/skills-system.md))

Condition example: `$if this.skills.agility.level > 2`:

{% hint style="info" %}
Note: The `$if` command is special and uses `eval` behind the scene to evaluate your condition as a piece of JavaScript that gets given access to specific variables. The code written in the `[condition]` part of the command is simply JavaScript.
{% endhint %}

## Example

```
set_example:
    choice:
        talk cat idle "Do you like surprises?"
        "Yes":
            set data.like_surprises true
        "No!":
            set data.like_surprises false
    $if this.data.like_surprises:
        talk cat idle "Since you like surprises, here's a surprise message"
```

![Result of the above code](../.gitbook/assets/set\_function\_example.gif)
