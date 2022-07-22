---
description: >-
  This guide explains how to get started using the narrat game engine in a
  minute
---

# Getting Started

## Getting Started

{% hint style="info" %}
Getting started with narrat is very quick. There is a ready-to-use template that can get you running your game in a minute
{% endhint %}

### Prerequisites

* Have [node.js ](https://nodejs.org/en/)installed (LTS version is fine)
* Have a text editor ready to go. We recommend [Visual Studio Code](https://code.visualstudio.com/)
* Know how to [open a terminal in a folder](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

### Creating the game

Use the [Narrat Template App](https://github.com/nialna/narrat-template). Users of git can press the "Use this template" button to generate a repo based on it. Otherwise, simply download it as a zip somewhere

{% hint style="info" %}
If not using git, simply download the template as a zip fileby pressing the code button next to the green "Use this template" button
{% endhint %}

![](<../.gitbook/assets/image (2).png>)

For more advanced manual installation instruction into an existing web project, see the [Installing Narrat in a web app](installing-narrat-in-a-web-app.md) guide

## Running the game

<details>

<summary>How it works</summary>

The narrat template is essentially a template for a mostly empty web project, with narrat as a library.

node.js is the JavaScript engine used to run our project (and build it or export it to an executable game later).

We use [npm ](https://www.w3schools.com/whatis/whatis\_npm.asp)to install libraries into the game. npm is simply a package manager for installing JS libraries with node.js

There is a [package.json](https://github.com/liana-p/narrat-template/blob/main/package.json) file at the root of the template, which is a standard node.js file for defining a project and its dependencies, which get installed via npm. Inside the `dependencies` part of this file, you can find narrat with a version number. This is what tells the project to install a specific version of narrat.

Our template uses npm to download and install narrat (and other dependencies) and get the game ready to go. Then using npm scripts, we can use run commands to build/export the game (which all use node.js under the hood one way or another).

</details>

With the narrat template cloned or downloaded, [open a terminal inside the folder](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

There is a first command to install the dependencies (libraries) on first use.

```bash
npm install
```

{% hint style="info" %}
You will probably see npm complain about "**security issues**" here. Those are false positives and **can be ignored** caused by a very careless implementation of security by NPM. Those security issues are irrelevant to the use case of narrat. Feel free to read more about why npm security warnings are broken in [this article ](https://overreacted.io/npm-audit-broken-by-design/)by Dan Abramov, creator of React
{% endhint %}

Once everything is installed, this command runs the game:

```bash
npm start
```

This should open a browser tab with the game running after a minute. The game can be accessed at https://localhost:8080

The game is ready to edit!

{% hint style="info" %}
Those `npm` commands come from node.js. If the commands aren't recognised, you probably didn't install node.js correctly. [More about npm install](https://www.stackchief.com/tutorials/npm%20install%20|%20how%20it%20works)
{% endhint %}

## Editing the game

{% content-ref url="customising-your-narrat-game.md" %}
[customising-your-narrat-game.md](customising-your-narrat-game.md)
{% endcontent-ref %}

## Building and exporting the game

{% content-ref url="building-and-exporting-your-game.md" %}
[building-and-exporting-your-game.md](building-and-exporting-your-game.md)
{% endcontent-ref %}

## Functions Documentation

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

