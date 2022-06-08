---
description: This page explains how to use CSS to theme the game and UI
---

# Theming the game and UI

Because narrat games are built using standard web tools (HTML/CSS/JS), it is possible to customise the styling of every element in the game using custom CSS.

## How CSS works

In short, CSS is a way to style web elements by giving styling properties to elements selected by a rule. For example:

```css
.button {
    background-color: red;
}
```

This rule would give a red background color to any element with the `button` css class. For more info, look at the [w3schools CSS intro](https://www.w3schools.com/css/css\_intro.asp) and don't be afraid to Google how to do things in CSS

## How to use CSS in Narrat

There are two ways to use CSS to customise your UI in Narrat. One is to edit CSS variables provided to override things like common colors, and the other is to write your own CSS classes to override existing ones from the engine.

## CSS Variables

### Introduction

<details>

<summary>How CSS Variables work</summary>

A CSS variable is simply a CSS property value stored in a variable. This allows the user to reuse that variable in multiple places. Using variables for common colors, sizes, backgrounds or others can combine into an easy to edit theme. For example, here's some of the default CSS in Narrat:

```css
:root {
  --text-color: #d9e1f2;
  --light-1: hsl(210, 30%, 40%);
  --light-2: hsl(255, 30%, 50%);
  --light-background: linear-gradient(to right, var(--light-1), var(--light-2));
}

.button {
  background: var(--light-background);
  color: var(--text-color);
}

.input {
  background: var(--light-background);
  color: var(--text-color);
}
```

The CSS code above creates some variables to store specific colors, and those colors are then reused in various CSS classes. This means changing the value of `--text-color` will apply the change to all CSS using it



</details>

Here is a list of the CSS variables that exist in narrat:

<details>

<summary>CSS Variables in Narrat</summary>

```css
:root {
  --bg-color: #131720;
  --text-color: #d9e1f2;
  --primary: hsl(255, 30%, 55%);
  --focus: hsl(210, 90%, 50%);
  --secondary: #42b983;
  --border-color: hsla(0, 0%, 100%, 0.2);
  --light-1: hsl(210, 30%, 40%);
  --light-2: hsl(255, 30%, 50%);
  --light-background: linear-gradient(to right, var(--light-1), var(--light-2));
  --shadow-1: hsla(236, 50%, 50%, 0.3);
  --shadow-2: hsla(236, 50%, 50%, 0.4);
  --hud-background: rgba(0, 0, 0, 0.4);
  --hud-text-color: var(--text-color);
  --notifications-bg: darkslateblue;

  --skills-text-background: rgba(0, 0, 0, 0.5);
  --skills-text-color: var(--text-color);
  --skills-level-background: rgba(0, 0, 0, 0.5);
  --skills-level-color: orange;
  --skills-xp-bar-height: 40px;

  --skill-check-name-color: orange;
  --skill-check-difficulty: orange;
  --skill-check-success: green;
  --skill-check-failed: red;
  --skill-check-color: orange;

  --dialog-choice-color: orange;
  --dialog-choice-hover-color: var(--text-color);
}
```

</details>

{% hint style="info" %}
To see the most up to date list of CSS variables, look at  [main.css](https://github.com/liana-pigeot/narrat/blob/main/src/sass/main.css#L6) in the engine
{% endhint %}

## Creating custom CSS classes

### Setup

The CSS variables above allow for easy customisation of common properties, but for deeper changes the best way is to write custom CSS classes. Most of the UI elements in narrat have a specific CSS class name or id which you can use to write custom CSS for them.

For example, the `.interact-button` is the CSS class given to the "Continue" button in the game's dialog UI, so writing CSS for it will change how that button looks:

```css
.interact-button {
  background-image: url("img/ui/continue.png");
  color: rgba(0, 0, 0, 0) !important;
}

.interact-button:hover {
  background-image: url("img/ui/continue_hover.png") !important;
}
```

{% hint style="info" %}
Note the `!important` parameter at the end. This helps your CSS property override an existing one in the engine, as it tells CSS to make this value take priority.
{% endhint %}

To be able to add custom CSS, you need a CSS file. The template already comes with one, but if for any reason you don't have any, all you need to do is create a `.css` file and import it inside your `index.ts`.

For example:

1. Create a folder `css` in the `src` folder, then a file called`main.css` in it
2. In `src/index.ts`, add the following: `import "./css/main.css";`
3. Any CSS you now add in main.css will be loaded in your game

### Available CSS classes to override

#### Buttons

* `.button`: Generic base class applied to all buttons
* `.interact-button`: The "Continue" button during dialogue
* `.dialog-choice`: The selectable choices in the dialogue
*

#### UI Elements

#### Text



