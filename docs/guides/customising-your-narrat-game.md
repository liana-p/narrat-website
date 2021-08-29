# Customising your Narrat game



## Customising your game

### Dialogue scripts

If you look in the `public/data` folder, there is an `example.rpy` file. This is where the actual game dialogue is written. The example dialogue there shows how to use a few basic features, so you can easily start writing your own dialogue.

### config.json

The config file contains basic info about your game. In it you can add images, screens, buttons, musics...

This is also where the scripts used in your game are listed. By default it only uses `data/example.rpy` but you can add more scripts to the list and they will all get loaded. The `scripts` object in `config.json` is what you should edit to add new dialogue scripts to your game \(it's an array of file paths\).

You can [learn more about json files if needed](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

### characters.json

The `characters.json` file contains the config for all characters that can speak in the game. They should all at least have a name value, and an `idle` sprite. The sprite is used for displaying character portraits during dialogue, and the value should be a file path relative to the `imagesPath` value defined in the config part of this file

You can change the color their name appears as by changing the `color` value in the `style` property of the character \(you can use any CSS valid color\).

If you want to customise even more, you can put a CSS properties object in the following properties:

* `stylesboxCss`: Will apply CSS to the container of a dialogue line for this character
* `style.nameCss`: Will apply CSS to the text with the title of the character
* `style.textCss`: Will apply CSS to the actual dialogue text for the character.

Example:

```text
    "player": {
      "style": {
        "color": "orange",
        "textCss": {
            "color": "blue"
        },
        "boxCss": {
            "backgroundColor": "white"
        }
      },
      "name": "You"
    },
```

## Writing dialogue scripts

Narrat script files are `.rpy` files using a syntax similar to Renpy. We advise using [Visual Studio Code](https://code.visualstudio.com) to edit scripts but you can use whichever one you want. It is important to note that narrat scripts are not renpy or python files but a different custom language.

Narrat scripts are split into labels, which are the first level of indentation you see in the code \(labels `main:` and `askForHelp:` , `askAboutChoices:` etc. in the example below\). Those labels are standalone pieces of script which can be played at anytime. `main` is the label that gets launched when the game starts. So you can see it as the intro for your game.

The syntax is based on indentation: An indent level is 4 spaces, and entering a new indentation level means entering a new block in the code. You have to follow the 4 space indentation rule, and can configure your code editor to follow this.

Note: The parser for the code is very new and likely to break if pushed too much. Please feel free to open [GitHub issues](https://github.com/nialna/narrat/issues) if you discover problems

### Adding your scripts to your game

To add new scripts to your game, add their path to the list in your `config.json` file. Make sure one of your files has the `main:` label, as that's where the game will start. You can add as many scripts as you want, and script files can reference labels in any of the other files, so their order doesn't matter.

Look at the example code to see syntax.

{% page-ref page="../examples/example-narrat-script.md" %}

