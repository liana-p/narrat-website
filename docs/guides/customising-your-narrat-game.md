---
description: This documentation page explains how to edit a narrat game
---

# Editing a narrat game

There are two types of content to edit to make a narrat game:

* Dialogue scripts: `.rpy` files that contain the branching narrative of the game
* Config files: `.json` files that contain config data about the game

### Public folder

The content to edit will usually be inside the `public` folder from the root of the game. This public folder is a folder for static assets which will be added to the final build. A narrat game is effectively made of config files and assets that are all inside this folder.

For advanced uses, it is also possible to change code itself or integrate plugins, in which case the place to edit those would be the `src` folder.

### Narrat scripts

{% content-ref url="../examples/example-narrat-script.md" %}
[example-narrat-script.md](../examples/example-narrat-script.md)
{% endcontent-ref %}

Narrat scripts are the main way a game is created. They contain the flow of the game and lines of dialogue.

In the `public/data` folder of the game, there is an `example.rpy` file (or named differently depending on which template you used). This is where the actual game dialogue is written. The example dialogue there shows how to use a few basic features, so you can easily start writing your own dialogue. Just above is a link to the example narrat script page to find more examples as needed.

{% hint style="warning" %}
Narrat scripts are in a custom language nade for narrat, see the [Language Syntax](language-syntax-and-expressions.md) page for more info. We only use the `.rpy` extension by default to so that IDEs can easily give us syntax highlighting, as the language is similar to syntax in ren'py. But narrat script is **Not ren'py or python**
{% endhint %}

We advise using [Visual Studio Code](https://code.visualstudio.com) for editing narrat scripts

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

{% hint style="info" %}
Many features get added to narrat frequently and some aren't documented yet but explained in the changelog. See the "Updating narrat" page below for more info.
{% endhint %}

{% content-ref url="updating-narrat.md" %}
[updating-narrat.md](updating-narrat.md)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}
