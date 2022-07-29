---
description: Those example config files are the ones used in the narrat demo
---

# Example Config

Those example config files are the ones used in the narrat demo. For the most up to date versions, visit the GitHub links.

## Game Config

The following page on github should contain the `config.json` currently used in the demo game

{% embed url="https://github.com/liana-p/narrat/blob/main/packages/narrat/examples/games/default/data/config.json" %}
Latest config.json file from the demo
{% endembed %}

<details>

<summary>Copy of the example game config.json (might be outdated, look at github for most recent)</summary>

```json
{
  "gameTitle": "Narrat Demo",
  "images": {
    "narrat": "img/backgrounds/narrat.png",
    "map": "img/backgrounds/map.png",
    "shopButton": "img/ui/shop-button.png",
    "parkButton": "img/ui/park-button.png"
  },
  "layout": {
    "backgrounds": {
      "width": 880,
      "height": 720
    },
    "dialogBottomPadding": 70,
    "minTextWidth": 475,
    "mobileDialogHeightPercentage": 60,
    "verticalLayoutThreshold": 1000,
    "portraits": {
      "width": 100,
      "height": 100
    }
  },
  "screens": {
    "default": {
      "background": "narrat"
    },
    "map": {
      "background": "map",
      "buttons": ["shopButton", "parkButton"]
    }
  },
  "buttons": {
    "shopButton": {
      "enabled": false,
      "background": "shopButton",
      "position": {
        "left": 38,
        "top": 6,
        "width": 255,
        "height": 226
      },
      "action": "shopButton"
    },
    "parkButton": {
      "enabled": false,
      "background": "parkButton",
      "position": {
        "left": 632,
        "top": 86,
        "width": 255,
        "height": 226
      },
      "action": "parkButton"
    }
  },
  "skills": {
    "agility": {
      "name": "Agility",
      "description": "How good you are at moving around.",
      "startingLevel": 0,
      "icon": "img/skills/agility.jpg",
      "hidden": true
    },
    "logic": {
      "name": "Logic",
      "description": "How good you are at solving problems",
      "icon": "img/skills/logic.jpg",
      "startingLevel": 0
    }
  },
  "skillOptions": {
    "xpPerLevel": 10
  },
  "skillChecks": {
    "rollRange": 100,
    "skillMultiplier": 10,
    "failureChance": 1,
    "difficultyText": [
      [0, "Very Easy"],
      [10, "Easy"],
      [30, "Medium"],
      [50, "Hard"],
      [70, "Very Hard"],
      [80, "Extremely Hard"],
      [90, "Near Impossible"]
    ]
  },
  "scripts": ["data/demo.rpy"],
  "audio": {
    "calm": {
      "loop": true,
      "path": "music/calm.mp3"
    }
  },
  "audioOptions": {
    "volume": 0.5,
    "musicFadeInTime": 0.5,
    "musicFadeInDelay": 0.5,
    "musicFadeOutTime": 0.5
  },
  "notifications": {
    "timeOnScreen": 1.5,
    "alsoPrintInDialogue": true
  },
  "hudStats": {
    "energy": {
      "icon": "img/ui/energy.png",
      "name": "Energy",
      "startingValue": 10,
      "minValue": 0,
      "maxValue": 10
    }
  }
}

```



</details>

## Characters Config

The following page on github should contain the `characters.json` currently used in the demo game

{% embed url="https://github.com/liana-p/narrat/blob/main/packages/narrat/examples/games/default/data/characters.json" %}
Latest characters.json file from the demo
{% endembed %}

<details>

<summary>Copy of the example game characters.json (might be outdated, look at github for most recent)</summary>

```json
{
  "config": {
    "imagesPath": "./img/characters/"
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
    "cat": {
      "sprites": {
        "idle": "cat_idle.jpg"
      },
      "style": {
        "color": "white"
      },
      "name": "Generic Cat"
    },
    "helper": {
      "sprites": {
        "idle": "helper_cat.png"
      },
      "style": {
        "color": "green"
      },
      "name": "Helper Cat"
    },
    "music_cat": {
      "sprites": {
        "idle": "music_cat.jpeg"
      },
      "style": {
        "color": "green"
      },
      "name": "Music Cat"
    },
    "inner": {
      "sprites": {
        "idle": "inner_voice.png"
      },
      "style": {
        "color": "red"
      },
      "name": "Inner Voice"
    }
  }
}

```



</details>
