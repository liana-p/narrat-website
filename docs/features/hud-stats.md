---
description: >-
  HUD Stats are number values that automatically appear in the HUD at the top
  right of the screen and can be controlled via game scripts.
---

# HUD Stats

HUD Stats are number values that automatically appear in the HUD at the top right of the screen and can be controlled via game scripts.

![](<../.gitbook/assets/image (21).png>)

## HUD Stats config

```json
{
  "hudStats": {
    "money": {
      "icon": "img/ui/money.png",
      "name": "Money",
      "startingValue": 0,
      "minValue": 0
    },
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

Stats are defined in the `hudStats` part of the config.

* `icon:` path to an image to use as the icon for the stat
* `name`: The name of the stat for display in the HUD
* `startingValue`: The default value for the stat on a new save
* `minValue`: How low this stat can go
* `maxValue`: How high this stat can go

### Functions

{% content-ref url="../functions-documentation/stats/" %}
[stats](../functions-documentation/stats/)
{% endcontent-ref %}

{% content-ref url="../functions-documentation/stats/add-stat.md" %}
[add-stat.md](../functions-documentation/stats/add-stat.md)
{% endcontent-ref %}
