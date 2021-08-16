---
description: >-
  Narrat is a narrative game engine for text-based games. Inspired by renpy
  syntax. Built to be customisable, extendable and web-focused.
---

# Narrat



## 🚀 Narrat

![example workflow](https://github.com/nialna/narrat/actions/workflows/main.yml/badge.svg)

[Narrat](https://get-narrat.com) is a narrative game engine for text-based games. Inspired by renpy syntax. Built to be customisable, extendable and web-focused.

You can [try a little demo](http://get-narrat.com/demo/). It contains a built version of the [narrat game template](https://github.com/nialna/narrat-template).

#### 

#### \#\# Getting Started

The Getting Started guide explains how to setup a narrat game and start editing it

{% page-ref page="getting-started.md" %}

You can also look at an example narrat dialogue script for reference

{% page-ref page="example-narrat-script.md" %}

### Features

* Flexible dialog writing with branching and conditions
* Multiple script files support with labels and jumps to organise script writing
* Skill checks \(Feature still early, needs a UI for viewing skills and creating characters\)
* Multiple speaking characters support with icons and poses
* Custom variables in scripts to create flags or other data the game needs to track
* \[NEW!\] Seamless saving and reloading
* \[NEW!\] UI with button that can be used for example to create world maps with clickable locations \(the buttons can be controlled in scripts\)
* \[NEW!\] Sound and music support
* \[NEW!\] Delays between script lines
* \[NEW!\] Electron build to turn the game into a pc/mac/linux app \(template to be updated with example soon\)

### Roadmap

* More UI customisation to change layout, colors, fonts etc
* Better documentation
* Testing and CI support for narrat scripts to easily detect scripting mistakes 
* Improvements to the template to make it more production ready

### How it works

A narrat game is a web app built around Vue.js. It is composed of the following things:

* The \[narrat template\]\([https://github.com/nialna/narrat-template](https://github.com/nialna/narrat-template)\), which is a simple web app setup with narrat pre-installed and ready to use
* Some config files defining characters, assets and dialogue scripts
* Dialogue scripts, which are the actual content of your game

Game dialogue scripts are written in files with a similar syntax to Renpy \(.rpy files\). Those files get loaded by the game engine which plays through them. This allows us to use [renpy syntax highlighting](https://marketplace.visualstudio.com/items?itemName=LuqueDaniel.languague-renpy) in vs code easily. It is **not renpy** though, just inspired from it. Some syntaxes are slightly different from it. Eventually narrat might have its own language and file extension support.

