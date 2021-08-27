# Saving and Reloading

## Saving and Reloading

### How saving works

Narrat supports automatic saving and reloading, but there are some important details worth knowing about.

How saves works:

* All relevant bits of the state are extracted into one object. This includes:
  * The `DATA` storage used for game variables
  * Skills
  * Previous dialog entries \(so they can be displayed on reload\)
  * button states on the interactive screens
  * Current label the script is at
  * skill checks passed or failed
  * play time \(unused for now\)
* This object gets stored in the browser's [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* On game load, the local storage gets read for a save, and if present all the data above gets placed in the state to continue playing

{% hint style="info" %}
Because there is no way to identify which specific line of dialogue the player is on, **saving only saves the last label the player started,** not the exact line they reached
{% endhint %}

### The problem with saving a specific line

We could save the dialog line number the player is at, but it would cause issues with game updates. Say the player is at line 53 of `some_script.rpy`, but you update the game and the code changes. Suddenly line 53 refers to a completely different bit of dialogue.

One solution could be to give every line of dialogue a unique identifier \(which would also allow for localisation\), but this would be very tedious for users and isn't planned at the moment.

The only viable solution for saving without risk of updates breaking it for now is to only remember the current label.

This means some dialogue might be replayed when a user reloads if they were halfway through a label

{% hint style="danger" %}
Currently, narrat saves every time a new line is played. There is a risk that some lines of script could be replayed if a user leaves and reloads halfway through a label. This can cause an unintended side effect of **replaying script effects twice**. See [related GitHub issue](https://github.com/nialna/narrat/issues/5)
{% endhint %}



