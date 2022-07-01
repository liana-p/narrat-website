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

<summary>CSS Variables available to override in Narrat</summary>

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

### How to find CSS classes to override

#### Using the devtools

<details>

<summary>How to find the CSS class and id of elements to theme them</summary>

The easiest way to find a CSS class name or id to override for theming a game is to use the browser inspector (right-click -> inspect on Chrome or Firefox).

<img src="../.gitbook/assets/image (11).png" alt="" data-size="original">

The devtools have a list of all the elements on the page in the elements tab (bottom left in the screenshot). This tool shows a tree view of all the DOM elements that constitute a web page (the narrat UI is made of DOM elements)Available CSS classes to override

![](<../.gitbook/assets/image (31) (1).png>)

Clicking on the arrow icon in the top left of the devtools opens a "picker" tool that allows clicking anywhere on the page to select an element in the elements view of the devtools. This makes it very easy to browse and find elements on a page.

Finding the css class or id for an element is then just a matter of looking at what's in the HTML for that element in the devtools after finding it with the picker:

![](<../.gitbook/assets/image (18).png>)

![](<../.gitbook/assets/image (30).png>)

Hovering elements in the elements tab also highlights them on the page.

The `class` property in an element is the CSS class name. Some elements also have an `id` property, which is the CSS id.



</details>

#### CSS class and CSS id

Once a css class or id has been found to edit an element, it's simply a matter of adding CSS for it. To create CSS for a class, the selector needs to start with `.` followed by the class name. For an id it's `#`. For example:

```css
.interact-button {
    /* This selector applies to the CSS class named "interact-button"
    color: red !important; 
}

#interact-button {
    /* This selector applies to the css ID named "interact-button"
    color: red !important; 
}
```

{% hint style="warning" %}
Be careful not to confuse CSS classes and ids, as the syntax for their selector is different.
{% endhint %}

### List of useful CSS classes to override

{% hint style="info" %}
`This list is a work in progress. If you can't find something or if it's been changed, use the instructions above to find it yourself in the game`
{% endhint %}

#### Buttons

<details>

<summary>Buttons CSS</summary>

`.button`: Generic base class applied to all buttons

![](<../.gitbook/assets/image (34).png>)

`.interact-button`: The "Continue" button during dialogue

![](<../.gitbook/assets/image (25).png>)

`.dialog-choice`: The selectable choices in the dialogue

![](<../.gitbook/assets/image (22).png>)

`.menu-button`: The two "start game" and "continue game" buttons

`.start-button`

![](<../.gitbook/assets/image (13).png>)

`.continue-button`

![](<../.gitbook/assets/image (29).png>)

</details>

#### UI Elements

<details>

<summary>Other UI Elements</summary>

.dialog-container: Contains all the dialog

![](<../.gitbook/assets/image (15) (1).png>)

.dialog: The entire right-side box of the screen that is scrollable with all the dialog in it

![](<../.gitbook/assets/image (20).png>)

.menu-container

![](<../.gitbook/assets/image (4) (1) (1).png>)

\#menu-button (note that it's an id and not a class)

![](<../.gitbook/assets/image (33).png>)

\#skills-menu-button

![](<../.gitbook/assets/image (26).png>)

</details>

<details>

<summary>General modal CSS</summary>

.modal-mask: The half-opaque overlay on the page when a modal is open

![](<../.gitbook/assets/image (28).png>)

.modal-container: The container class for all modals

![](<../.gitbook/assets/image (10).png>)

.modal-header

![](<../.gitbook/assets/image (19).png>)

.close-button: The button to close modals

![](<../.gitbook/assets/image (9).png>)

.modal-body

![](<../.gitbook/assets/image (16).png>)

.modal-footer: There's a footer space that is currently unused in modals

![](<../.gitbook/assets/image (7) (1).png>)

</details>

<details>

<summary>Specific popups CSS</summary>

Each modal in the game has its own CSS class applied to the `modal-container` to allow overriding things like width/height on a per-screen basis.

.menu-modal

![](<../.gitbook/assets/image (17).png>)

.skills-modal

![](<../.gitbook/assets/image (35).png>)



</details>

#### Skills Screen

<details>

<summary>Skills Screen CSS</summary>

.skills-container

![](<../.gitbook/assets/image (14).png>)

One thing worth knowing is the `.skills-container` class in the skills screen uses [CSS grid](https://learncssgrid.com/). To change how many columns there are per row, overriding the `grid-template-columns` works. For example:

```css
.skills-container {
    grid-template-columns: repeat(4, 1fr); /* The first number in repeat is the number of desired columbns */
    grid-gap: 30px 30px; /* Space between elements */
}
```

.skill-display: The individual tile for a skill

![](<../.gitbook/assets/image (32).png>)

.skill-title

![](<../.gitbook/assets/image (12).png>)

.skill-xp-container and .skill-xp-bar: skill-xp-container is the background of the xp progress bar, whereas skill-xp-bar is the inner bar that gets filled depending on the amount of xp

.skill-xp-text is also the text of the xp

![](<../.gitbook/assets/image (21) (1).png>)

.skill-level

![](<../.gitbook/assets/image (24).png>)





</details>





