---
title: "Narrat"
slug: "narrat"
description: "Narrat is a narrative game engine built for the web and desktop"
---

## What is narrat?

Narrat is a narrative game engine for text-based games. Inspired by renpy syntax and built to work on the web, mobile and desktop.

![Narrat banner screenshot](./narrat-banner.jpg)

## Demo

You can play an [interactive demo](https://get-narrat.com/demo/). This demo is a built version of our [narrat demo repo](https://github.com/nialna/narrat-demo).

Game dialogue info is written in files with a similar syntax to Renpy (.rpy files). Those files get loaded by the game engine which plays through them. This allows us to use [renpy syntax highlighting](https://marketplace.visualstudio.com/items?itemName=LuqueDaniel.languague-renpy) in vs code easily. It is **not renpy** though, just inspired from it. Eventually narrat might have its own language and file extension support.

## Usage

See the [Documentation](https://docs.get-narrat.com/) for more info, or jump directly in the [Getting Started Guide](https://docs.get-narrat.com/getting-started)

## Features

* Flexible dialog writing with branching and conditions
* Multiple script files support with labels and jumps to organise script writing
* Multiple speaking characters support with icons and poses
* Custom variables in scripts to create flags or other data the game needs to track
* Seamless saving and reloading
* UI with buttons that can be used for example to create world maps with clickable locations (the buttons can be controlled in scripts)
* Sound and music support
* Delays between script lines
* Electron build to turn the game into a pc/mac/linux app (template to be updated with example soon)
* Skill checks (Feature still early, needs a UI for viewing skills and creating characters)