# Installing Narrat in a web app

## Install on a project

`npm install narrat`

For narrat to run, it needs two pieces of data:

* The `config` file which contains the path of your script files and other info
* The `characters` file which contains the list of characters in the game

Copy the content of the example [public folder from the template](https://github.com/nialna/narrat-template/tree/main/public)  somewhere in your app that can be served statically, and have an `#app` div in your page's html including your javascript \(you can copy `public/index.html`\) .

Then in your javascript code to launch narrat, use:

```text
import { startApp } from 'narrat';
// Call `startApp` to run the game, passing the path to your config file and characters file.
startApp({
  charactersPath: 'data/characters.json', // Replace with whatever path you have
  configPath: 'data/config.json',
});
```

## Customising your game

See the Customising your Narrat game page for more info on how to edit the game

{% page-ref page="customising-your-narrat-game.md" %}

## Building and exporting your game

See the Building and exporting your game page

{% page-ref page="building-and-exporting-your-game.md" %}



