quest_demo:
  set_button shopButton true
  set_button parkButton greyed
  jump bread_quest

bread_quest:
  choice:
    talk helper idle "Can you get 2 pieces of bread for me?"
    "Yes":
      talk helper idle "Thanks, that's very nice!"
      talk helper idle "I'll be waiting for you at the park"
      jump bread_start
    "No":
      talk helper idle "Oh, okay"
      jump quest_demo

bread_start:
  start_quest breadShopping
  talk inner idle "Time to go to the shop to buy some bread then."
  set_screen map
  set_button shopButton true

shopButton:
  // set_screen default
  "You visit the bread shop"
  talk shopkeeper idle "Hello, I'm a little baker selling bread and drinks!"
  set data.breadPrice 5
  jump shop_menu

parkButton:
  choice:
    talk helper idle "Ah, so do you have my bread?"
    "Yes!" if (>= $items.bread.amount 2):
      talk helper idle "Thanks a lot!"
      add_item bread -2
      complete_objective breadShopping delivery
      complete_quest breadShopping
      set_button parkButton false
      jump demo_end
    "No :(":
      talk helper idle "Oh okay"

shop_menu:
  choice:
    talk shopkeeper idle "So, do you want some bread?"
    "Buy bread (costs %{data.breadPrice})" if (>= $stats.money.value $data.breadPrice):
      add_item bread 1
      if (== $data.breadPrice 5):
        add_stat money -5
      else:
        add_stat money -4
      jump map_update
    roll bread_haggle haggling 50 "Try to haggle for bread" hideAfterRoll:
      success "You explain that helper cat needs bread to feed his poor family":
        add_xp haggling 10
        set data.breadPrice 4
        talk shopkeeper idle "I guess I can sell you bread for 4 coins"
        jump shop_menu
      failure "You try to pity trip the shopkeeper but he won't bulge":
        add_xp haggling 5
        talk shopkeeper idle "The price is 5 coins, nothing less, nothing more."
        jump shop_menu
    "Exit":
      jump map_update

show_map:
  set_button parkButton false
  set_button shopButton true
  set_screen map

map_update:
  set_button parkButton false
  set_button shopButton true
  log $items.bread
  if (>= $items.bread.amount 2):
    complete_objective breadShopping bread
    talk inner idle "I've got enough bread now, I'm going to go to the park."
    start_objective breadShopping delivery
    set_screen map
    set_button parkButton true
    set_button shopButton false
  else:
    talk inner idle "Hmm, I still need to buy more bread for helper cat."
    set_screen map

eat_bread:
  talk player idle "hmm, bread"

read_book:
  talk inner idle "It's full of ocult rituals. I'm not sure what they are, but I'm sure they are useful."
