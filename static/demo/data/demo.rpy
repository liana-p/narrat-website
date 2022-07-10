main:
  "You open the narrat demo and wonder what narrat is and how it works"
  choice:
    "How about asking for help?"
    "Ask for help":
      jump askForHelp
    "No, I don't want help 😡"
      jump dontAskForHelp

dontAskForHelp:
  // clear_dialog
  talk inner idle "Maybe we should get help though? I don't really know what else to do"
  jump main

askForHelp:
  talk helper idle "Hello! I'm Bob the helper cat. I heard you're trying to play the narrat demo!"
  talk helper idle "Narrat is a game engine for narrative games that is based on web technologies. You can make games with it that will run on browsers (desktop and mobile) and can be built for PC too!"
  talk helper idle "You can view the source script for this demo in the <a href=\"https:\/\/github.com\/liana-pigeot\/narrat-demo\/public\/data\/demo.rpy\" target=\"_blank\">demo repo</a>"
  talk helper idle "There is also a <a href=\"https:\/\/github.com\/nialna\/narrat-template\" target=\"_blank\">game template</a> ready to use to start making your own game."
  talk helper idle "If you want more info, you can look at the <a href=\"https:\/\/docs.get-narrat.com\" target=\"_blank\">documentation</a>"
  talk helper idle "But for now, this is the demo! I will show you the most common features of narrat and how they work in practice."
  talk helper idle "As you've probably noticed, you can make choices in narrat games. Player choices are the basic building blocks of a narrative game, as it's what makes it interactive!"
  talk helper idle "There are lots of things you can do to make an interactive story in Narrat really. Choices are only one of the many features."
  talk helper idle "I'm going to send you to my other friend who has some questions for you."
  jump askAboutChoices

askAboutChoices:
  choice:
    talk cat idle "Hi! I'm Bob's friend, Felix! I have a question, do you like making choices in games?"
    "Yes":
      set data.likeChoices true
      "Cat will remember this."
    "No":
      set data.likeChoices false
      "Cat will remember this."
  choice:
    talk cat idle "Now I think we should do an activity based on choice making?"
    "Yes, I like making choices!" if $data.likeChoices: // A choice can have a condition so it only appears in the list if the condition is met
      jump makeChoices
    "No, I don't like making choices" if (! $data.likeChoices):
      jump dontLikeChoices
    "I don't want to do anything!":
      jump doNothing

dontLikeChoices:
  talk cat idle "See, this choice you picked only appeared as an option because you said you didn't like choices earlier!"
  talk cat idle "This demo has a lot of choices in it though, so you'll have to deal with it."
  jump doNothing


makeChoices:
  talk cat idle "See, this choice you picked only appeared as an option because you said you liked choices earlier!"
  choice:
    talk inner idle "I don't know, we've been making a lot of choices already lately."
    "I still want to make a choice!":
      talk helper idle "Well you just made one, it turns out. Can we continue now?"
      jump doNothing
    "I guess you're right":
      jump doNothing


doNothing:
  choice:
    talk music_cat idle "How about we get some music in here?"
    "Play some relaxing music":
      play music calm
    "I hate music":
      talk music_cat idle "Well too bad, it's up to you."
  jump otherFeatures

otherFeatures:
  talk helper idle "There are lots of other features, like skill checks and conditions."
  add_level agility 1
  talk helper idle "For example you just levelled up in agility. You can view your skill level in the skills menu"
  add_xp agility 3
  talk helper idle "It's also possible to gain xp"
  if (roll someSkillCheck agility 40): // You can use skillchecks in conditions
    "This line only appears if you passed a hidden passive skill check"
  "Skill checks can also happen as a choice option:"
  jump skillCheckChoice

skillCheckChoice:
  choice:
    "Should we try jumping over a fence?"
    roll aSkillCheck agility 70 "Try jumping!" hideAfterRoll:
      success:
        "You graciously jump over a fence, hair blowing in the wind, and land in a heroic pose that would be used in a movie trailer."
        talk inner idle "Woo I did it!!!"
      failure:
        "You try jumping over the fence, but not high enough. You stab your toe against the fence and fall head first into a puddle of mud. It's also in the background of a tiktok a passerby was filming now."
        talk inner idle "Ouch!"
    "No I'm a coward, I'd rather not":
      "Well okay then"
  jump stats

stats:
  talk helper idle "There is a stats features, which allows special values to be shown in the HUD. Useful to count currency, energy or things like that."
  jump stats_2

stats_2:
  choice:
    "Can we spend some energy?"
    "Spend 5 energy" if (>= $stats.energy.value 5):
      add_stat energy -5
      talk player idle "Spent 5 energy!"
    "I'm too tired!" if (<= $stats.energy.value 0):
      jump saveLoad
  jump stats_2

saveLoad:
  talk helper idle "Narrat can save and load the game too. It is done automatically, so no need to worry about it."
  talk helper idle "The game gets saved whenever the script reaches a new label. Labels are different parts of the game script to organise the game."
  talk helper idle "For example right now we're in the 'saveLoad' label of the script (you can look at it in the demo.rpy file!). So the game just saved recently"
  talk helper idle "If you try using the menu button to go back to the main menu and reload the game, it will resume at the start of this label."
  jump showMap

showMap:
  talk helper idle "There is also a screen feature on the left where you can display background images with interactive buttons."
  set_screen map
  set_button parkButton true
  talk helper idle "This is an example map. There are buttons you can click on. It is possible to dynanically enable and disable buttons in your script"
  talk helper idle "You can view the source script for this demo in the <a href=\"https:\/\/github.com\/nialna\/narrat-demo\">demo repo</a>"

shopButton:
  "You visit the shop and buy some water and a snack"
  talk inner idle "That water was very hydrating!"
  talk helper idle "Now that you're well hydrated and on your way to eat your 5 a day, you could learn more about how to make games"
  talk helper idle "The best way is to read the readme page on the narrat github page"
  talk helper idle "You can look at how the demo is made, especially by opening the example.rpy file which is the script for this demo"

parkButton:
  "You go on a walk to the little park"
  talk inner idle "That was a nice walk! Now I feel like going to the shop to buy water"
  set_button shopButton true