---
layout: documentation
---
# Pixel Kit Library Guide

If you are familiar with Pixel Turtle already this will be much easier. Pixel Turtle has a list of instructions, commands and options that are written using Pixel Kit Library under the hoods. Pixel Turtle is made to be simple to understand and Pixel Kit library is made to be optimal to write more advanced and faster code.

The two main features of Pixel Kit library are:

- Draw with the LEDs in a more efficient way than using Pixel Turtle
- Interact with buttons and dial

For that we must write our code a little bit different and this guide will tell you the differences and how to do it.

By default the Pixel Kit library is already available to us through the variable `kit`. If it's not then you can make it available by typing:

```python
import PixelKit as kit
```

**Every time we need to call a Pixel Kit instruction, for example `render()`, we must call it by adding the variable `kit` before and adding a `.` in between**.

For the `render()` example it would look like this:

```python
kit.render()
```

## Setting and Rendering

On Pixel Turtle, every time we tell a word like `forward()` the turtle automatically move forward and draw on screen (if the "pen" is down). That is very useful but presend a problem:

What happens if we want a full drawing to appear on the screen at once?

For example if we want to color the entire screen at once, we can't do that with Pixel Turtle because it will draw line by line, column by column and the screen will get color in different moments.

So that is why in Pixel Kit library we separate drawing in two phase:

### Buffer

When we call the drawing commands on Pixel Kit library, nothing will be updated on the LEDs. That is because we are not drawing directly to the LEDs. Imagine we are drawing on a ghost screen that eventually we can stamp into the real LED screen. This ghost screen is what we call a "buffer". All the drawing commands on Pixel Kit are actually drawing on the buffer and not directly on the screen.

The reason for drawing on a buffer first is because we want to be able to finish our drawing first and then draw it at once on our screen.

For example if we want draw a background, a sky and some trees on the ground. We need to write separated code to each of those things we want to draw and they will be executed one after the other by the Pixel Kit but sometimes we want to have the impression it's all done at once. That is possible by drawing to the buffer first as many times as we want and then rendering it to the LEDs.

### Rendering

Telling Pixel Kit to `render()` is very simple. It will take whatever is on the buffer and "stamp" it to the LEDs. Once you have rendered the buffer you can change it and the LEDs will remain as they were when last rendered.

The only thing we need to pay attention is that `render()` takes a few fractions of seconds to be done and this will define how fast we can update your LEDs. Usually we can call `render()` from 5 to 10 times in 1 second.

## Setting Pixels

The Pixel Kit Library has no `forward()` or `left()` commands but instead it has `set_pixel(x, y, color)` that is very similar to Pixel Turtle's `moveTo(x, y)` except that we have to specify which color you want to set the Pixel.

For example if we want to set a white pixel on the top left corner of our Pixel Kit we should write something like this:

```python
kit.set_pixel(0, 0, white)
kit.render()
```

When combined with [repetition](programming-in-python.html#repetition) and [functions](programming-in-python.html#functions) we can draw anything we imagine (and fits on the Pixel Kit LEDs):

```python
def rectangle(x, y, width, height, color):
  for i in range(0, width):
    for j in range(0, height):
      kit.set_pixel(x+i, y+j, color)

rectangle(2, 3, 5, 3, red)

kit.render()
```

## Setting Background and Clearing screen

In programming usually there are many ways to do the same thing. Knowing which one to use is very personal and depends a lot on the context as different ways to do things have different features and drawbacks. Clearing the screen or drawing a background is one of them.

To begin with, let's start with `clear()`. Every time we call `clear()` we are setting all the pixels on our buffer to `black`. In fact what we are doing is turing off your LEDs. That is very useful when we want to clean some messy drawing or just turn off all the LEDs. Also for `clear()` we must call `render()`. The code for doing it is very simple:

```python
kit.clear()
kit.render()
```

This is very usefull but what if we are drawing not on top of a `black` background but on top of a `green` background? We would need to `clear()`, then set all our LEDs to `green`. That will work but as we grow our code it will start to be very slow.

That is why we also have a `set_background(color)` command. `set_background(color)` will do the same as `clear()` but instead of setting all the LEDs to `black` it will set them to a color we can choose. This way we don't have to `clear()` and `set_background(color)` but just `set_background(color)`.. Something like this:

```python
kit.set_background(green)
kit.render()
```

If you call `set_background()` without any color it will set all the LEDs to `yellow` by default.

## Buttons and Dial values

There are a few ways to ask Pixel Kit if a button is pressed and what to do when this it's pressed. The same works for the dial on top of Pixel Kit. Usually it's helpful understand what are the options to choose which one is the best for us as different ways to ask will give us some advantages and some disadvantages.

Before we can read the buttons and dial, let's list all the available buttons.

On the bottom left corner of our Pixel Kit we have the **joystick**. It can go up, down, left, right and we can click it without any directions.

On the bottom right corner we have our **button A** and **button B**. Button A is the one on the left and Button B is the one on the right.

On top of our Pixel kit there is the dial. There are some drawings on the dial to help us know how much is already turned. Next to the dial, on the transparent plastic to the right we can see a mark in form of a little bump. Think it as an arrow to indicate what is the current dial value.

### Reading button values

The quick way to know if a button is pressed is by checking its value. You can check it by evaluating its value on the console or by printing the value. To print the value of the button A we can write something like this:

```python
print()
print(kit.button_a.value())
```

And we will see on the console a number `0` or `1`. If the buttons is being pressed it will be `0`, else it will be `1`. Try executing the previous code without holding the button A and after try executing it holding the button.

### Taking decisions based on button values

If you don't like to print the value you can use the LEDs to tell you if the button is pressed or not. For that we can store the button value on a [variable](programming-in-python.html#variables) and make a [decision](programming-in-python.html#conditions) based on it. The code would be something like this:

```python
button_aValue = kit.button_a.value()
if button_aValue == 1:
  kit.set_background(yellow)
else:
  kit.set_background(green)
kit.render()
```

We will notice that if you press the button A after the code executes nothing will happen. That is because this code execute only once, check the value of the button at the time of execution then stops. So if the value changes after the execution, Pixel Kit won't know.

### Keep asking the value of a button

There is a trick to keep the code running, asking the value and changing the background accordingly. This trick is to trap our code inside of an infinite loop. It sounds scarry but it's very simple, we can tell the Pixel Kit to run something forever by telling it to run `while` a condition that will never change. In practice it can be done like this:

```python
from time import sleep

while True:
  button_aValue = kit.button_a.value()
  if button_aValue == 1:
    kit.set_background(yellow)
  else:
    kit.set_background(green)
  kit.render()
  sleep(0.1)
```

Since `True` will never be set to `False`, the only way to stop the program is by interrupting it's execution (stop button on Flying Circus or turning the board off and on again).

As long you hold the button A pressed, it keeps the `green` background. That is because you are executing the `kit.set_background(green)` every time the code runs.

Notice the `sleep()` command being imported on the begining of the code and used after we `render()` our background color. What it does is to stop the execution for `0.1` seconds before it repeats, limiting it to run no more than 10 times every second. This is a safety measurement to avoid crashing the Pixel Kit by asking it to do too many things too fast.

### Dial value

We can also check what is the dial value. It's as simple as checking the button except instead of calling `button_a.value()` for example we'll call `dial.read()`. The code is something like this:

```python
print()
print(kit.dial.read())
```

The dial value changes from `0` to `4095` and the same applies if we want to keep asking and making decisions based on this value:

```python
from time import sleep

while True:
  dialValue = kit.dial.read()
  if dialValue > 2050:
    kit.set_background(yellow)
  else:
    kit.set_background(green)
  kit.render()
  sleep(0.1)
```

### Events

By checking the value of buttons and dial we can tell if a button is pressed and how far the dial is turned but this approach makes us to write quite a lot of code and as we develop our ideas and write more and more code it might get really hard to read, understand and solve problems. Thinking about that, Pixel Kit library has a different, simpler but more advanced way to tell Pixel Kit to do something when a button is pressed or the dial value changes without having to ask all the time for it!

The way we do this is by creating a function with the thing we want to do, for example let's say we want to change the position of a pixel on the screen when we press joystick left. Besides the difference in the way you write the code we might notice that the code to be executed when the button is pressed only happens once.

The way we use events it's more or less like this:

```python
from time import sleep

position = 10

def change_position():
  global position
  if position > 0:
    position = position - 1

kit.on_joystick_left = change_position

while True:
  kit.check_controls()
  kit.set_background(yellow)
  kit.set_pixel(position, 4, purple)
  kit.render()
  sleep(0.1)  
```

There are a lot of new things on this code but the parts to pay attention are the `check_controls()` and `kit.on_joystick_left = change_position`.

In order to make Pixel Kit call `change_position` when we hit the joystick left we must tell it to check the controls. Controls are the joystick, buttons and dial. Once we call `check_controls()` it will update all the values so we don't have to do it manually and most importantly it will call the correct event once the control is changed.

Last but not least important if we want to change a variable that is created outside of any function we must tell Pixel Kit it's a `global` before we perform any changes on it.

The available events are `on_joystick_left`, `on_joystick_right`, `on_joystick_up`, `on_joystick_down`, `on_joystick_click`, `on_button_a`, `on_button_b` and `on_dial`.
