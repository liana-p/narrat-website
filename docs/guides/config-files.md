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

The simplest way to create a narrat game is to start by copying the [narrat template](https://github.com/liana-pigeot/narrat-template). This template already includes `config.json`  and `characters.json` files ready to use inside the `data` folder

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

The `config.json` file is a json file which should already contain most of what's needed in it if using the template. For the most recent example of what can go in a config file, the [narrat repo's test config ](https://github.com/liana-pigeot/narrat/blob/main/public/data/config.json)uses most options.

The various features and guides sections of this documentation can give more information about how to use each option.

### Config options

There are many possible options in the config. They are not currently all documented, but a good way to find out possible options is to look directly at the [type definition file ](https://github.com/liana-p/narrat/blob/main/src/config.ts#L63)for the config in the engine source code. The config interface defines all the possible fields that can be added in your config.json file.

{% hint style="info" %}
This type definition is a [TypeScript interface](https://www.educative.io/blog/typescript-interfaces). It is used in the engine code to know the shape and possible values in the config file, so this is the best source of truth to find out all the options.
{% endhint %}

### How the config works

The engine follows this process for loading the config:

* Load the engine's [default config](https://github.com/liana-p/narrat/blob/main/src/defaultConfig.ts#L3) (this default config exists to provide default values to all options to avoid errors if games omit necessary fields)
* Load the game's `config.json` file. This is the file where a game can edit options
* Override the default config with what's in the game supplied config.json to generate the final config before launching the engine

### Characters config

Additionally to `config.json`, there is a separate `characters.json` file containing the config for all characters in the game.

A character's config can have the following values:

* `name`: The name the character will appear as
* `sprites`: A key-value object of pose names to the url of the picture to use for that pose. Poses are used with the talk command (the command `talk player idle "A sentence"` would use the character "player" with the picture for the pose named "idle")
* `style`: A [CSS style object](https://www.w3schools.com/jsref/dom\_obj\_style.asp) for custom-styling of the character's name. Most common option used here is `color`.

{% hint style="info" %}
To find out more advanced and latest possible options for the `characters.json` file, look at the [type definition](https://github.com/liana-p/narrat/blob/main/src/types/character-types.ts) for this file, similarly to what's explained above for `config.json`
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

