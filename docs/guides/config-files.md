---
description: A narrat game needs various config files to function
---

# Config files

## Introduction

A narrat game needs two config files to function: The main `config.json` where a lot of settings are configured, and `characters.json` where the various characters that can speak in the game are setup.

There are example files available for both of these:

{% content-ref url="../examples/example-config.md" %}
[example-config.md](../examples/example-config.md)
{% endcontent-ref %}

## Editing the config

The simplest way to create a narrat game is to start by copying the [narrat template](https://github.com/liana-pigeot/narrat-template). This template already includes `config.json`  and `characters.json` files ready to use.

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

### Layout

The `layout` key in the config defines the overall layout of the game. This allows individual games to tweak how much space the dialogue box on the right of the interactive screens on the left take, and the resolution/aspect ratio of the game.

* backgrounds:&#x20;
  *
