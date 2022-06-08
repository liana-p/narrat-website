---
description: >-
  Narrat is a narrative game engine for text-based games with many features to
  make games more interactive than your average visual novel
---

# Narrat

## Narrat Documentation

![](.gitbook/assets/narrat-banner.jpg)

You can [try a little demo](http://get-narrat.com/demo/). It contains a built version of the [narrat game demo](https://github.com/nialna/narrat-demo)

## Getting Started

The Getting Started guide explains how to setup a narrat game and start editing it

{% content-ref url="guides/getting-started.md" %}
[getting-started.md](guides/getting-started.md)
{% endcontent-ref %}

You can also look at an example narrat dialogue script for reference

{% content-ref url="examples/example-narrat-script.md" %}
[example-narrat-script.md](examples/example-narrat-script.md)
{% endcontent-ref %}

{% content-ref url="examples/example-config.md" %}
[example-config.md](examples/example-config.md)
{% endcontent-ref %}

{% hint style="info" %}
The sidebar on the left of this documentation has various sections worth looking at

* **Guides**: General guides on how to do things with the engine
* **Features**: Introduction to specific features and how to use them
* **Functions Documentation:** API Documentation for every command available to game scripts
{% endhint %}

## Features

* Easy syntax for writing games inspired by Ren'pu
* Flexible dialog writing with branching and conditions
* Multiple script files support with labels and jumps to organise script writing
* Multiple speaking characters support with icons and poses
* Custom variables in scripts to create flags or other data the game needs to track
* Skill systems with levels skill checks
* Interactive screens alongside dialogue
* Customisable HUD for currencies or other stats
* Save/Load
* Audio
* Fully customisable and themable UI
* Exports to web (desktop/mobile) or PC
* ...And much more!

## How it works

A narrat game is a web app built around Vue.js. It is composed of the following things:

* The [narrat template](https://github.com/nialna/narrat-template), which is a simple web app setup with narrat pre-installed and ready to use
* Some config files defining characters, assets and dialogue scripts
* Dialogue scripts, which are the actual content of your game

Game dialogue scripts are written in files with a similar syntax to Renpy (.rpy files). Those files get loaded by the game engine which plays through them. This allows us to use [renpy syntax highlighting](https://marketplace.visualstudio.com/items?itemName=LuqueDaniel.languague-renpy) in vs code easily. It is **not renpy** though, just inspired from it. Some syntaxes are slightly different from it. Eventually narrat might have its own language and file extension support.
