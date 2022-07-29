---
description: A narrat game needs various config files to function
---

# Config files

## Introduction

A narrat game needs two config files to function: The main `config.json` where a lot of settings are configured, and `characters.json` where the various characters that can speak in the game are setup. Both of those files are by default in the `public/data`  folder.

There are example files available for both of these:

{% content-ref url="../examples/example-config.md" %}
[example-config.md](../examples/example-config.md)
{% endcontent-ref %}

## Editing the config

By default `config.json` should be in `public/data`

<details>

<summary>How to manually setup config files (ignore this if using the template)</summary>

To manually setup config files to use with narrat, you need your code to call the `startApp` function from narrat, passing it a config object that includes the path to config files:

```typescript
import "./css/main.css";
import { startApp } from "narrat";

window.addEventListener("load", () => {
  startApp(
    {
      charactersPath: "data/characters.json",
      configPath: "data/config.json",
    },
    {
      debug: true,
      logging: false,
    }
  );
});
```



</details>

The `config.json` file is a json file which should already contain most of what's needed in it if using the template. For an example config file, look at the [example configs page](../examples/example-config.md)

The various features and guides sections of this documentation can give more information about how to use each option.

### Config options

There are many possible options in the config. They are not currently all documented, but a good way to find out possible options is to look at options used in examples games, or directly at the [type definition file ](https://github.com/liana-p/narrat/blob/main/packages/narrat/src/config.ts#L86)for the config in the engine source code. The config interface defines all the possible fields that can be added in your config.json file.

{% hint style="info" %}
This type definition is a [TypeScript interface](https://www.educative.io/blog/typescript-interfaces). It is used in the engine code to know the shape and possible values in the config file, so this is the best source of truth to find out all the options.
{% endhint %}

### How the config works

The engine follows this process for loading the config:

* Load the engine's [default config](https://github.com/liana-p/narrat/blob/main/packages/narrat/src/defaultConfig.ts) (this default config exists to provide default values to all options to avoid errors if games omit necessary fields)
* Load the game's `config.json` file. This is the file where a game can edit options
* Override the default config with what's in the game supplied config.json to generate the final config before launching the engine

### Characters config

Additionally to `config.json`, there is a separate `characters.json` file containing the config for all characters in the game.

A character's config can have the following values:

* `name`: The name the character will appear as
* `sprites`: A key-value object of pose names to the url of the picture to use for that pose. Poses are used with the talk command (the command `talk player idle "A sentence"` would use the character "player" with the picture for the pose named "idle")
* `style`: An object to customise how that character looks with the following options:
  * color: a CSS color (ie. "red", or #FFF)
  * boxCss:  [CSS style object](https://www.w3schools.com/jsref/dom\_obj\_style.asp) for custom-styling of the box encapsulating a dialogue from that character.
  * nameCss: Same as above, but the styling will apply to the name of the character specifically
  * textCss: Same as above, but will apply to the text "spoken" by the character

{% hint style="info" %}
To find out more advanced and latest possible options for the `characters.json` file, look at the [type definition](https://github.com/liana-p/narrat/blob/main/packages/narrat/src/types/character-types.ts) for this file, similarly to what's explained above for `config.json`
{% endhint %}

Example character config file:

```json
{
  "config": {
    "imagesPath": "img/characters/"
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
    },
    "helper": {
      "sprites": {
        "idle": "helper_cat.png"
      },
      "style": {
        "color": "green"
      },
      "name": "Helper Cat"
    }
  }
} 
```

