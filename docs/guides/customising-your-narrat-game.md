---
description: This documentation page explains how to edit a narrat game
---

# Editing a narrat game

There are two types of content to edit to make a narrat game:

* Dialogue scripts: `.rpy` files that contain the branching narrative of the game
* Config files: `.json` files that contain config data about the game

### Dialogue scripts

{% content-ref url="../examples/example-narrat-script.md" %}
[example-narrat-script.md](../examples/example-narrat-script.md)
{% endcontent-ref %}

In the `public/data` folder of the template or demo, there is an `example.rpy` file. This is where the actual game dialogue is written. The example dialogue there shows how to use a few basic features, so you can easily start writing your own dialogue. Just above is a link to the example narrat script page to find more examples as needed.

Narrat script files are `.rpy` files using a syntax similar to Renpy. We advise using [Visual Studio Code](https://code.visualstudio.com) with the r[en'py syntax highlighter extension](https://marketplace.visualstudio.com/items?itemName=LuqueDaniel.languague-renpy).

See the page linked below for more details on how to write narrat scripts.

{% content-ref url="language-syntax-and-expressions.md" %}
[language-syntax-and-expressions.md](language-syntax-and-expressions.md)
{% endcontent-ref %}

### Config files

#### config.json

The config file contains basic info about the game. In it are defined images, screens, buttons, musics, skill checks, items, quests and more.

This is also where the script files used in game are listed. By default it only uses `data/example.rpy` but  any amount of scripts can be added to the list and they will all get loaded.

More info about the config files in the [Config Files guide](config-files.md)

#### characters.json

The `characters.json` file contains the config for all characters that can speak in the game. They should all at least have a name value, and an `idle` sprite. The sprite is used for displaying character portraits during dialogue, and the value should be a file path relative to the `imagesPath` value defined in the config part of this file

The color character names appears as can be changed with the `color` value in the `style` property of the character (the value can be any valid CSS color).

Example:

```
 {
  "config": {
    "imagesPath": "./img/characters/"
  },
  "characters": {
    "game": {
      "name": "",
      "color": "white"
    },
    "player": {
      "style": {
        "color": "orange"
      },
      "name": "You"
    }
  }
}
```

### What next?

Making a game is simply a matter of editing those files to write the game you want. To know more about available features, look at the left sidebar of this documentation website to see pages about all the features and guides on specific things.

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}
