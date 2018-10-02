<div id="connecting"></div>

# Connecting

## Ip Address

When your Pixel Kit is connected to a wifi network it will display its ip address in binary format. Red dots mean 1, no dots mean 0.

Make sure your Pixel Kit and computer are on the same network (either the one Pixel Kit created itself or the one you connected it to) and type the ip address in binary or decimal format. It will look something like this:

```python
> 11000000101010000000010000000001
```
or
```python
> 192.168.4.1
```

## Boot screens

When your Pixel Kit boots up it shows a few screens to let you know what it's doing and its state. Here is what they mean:

- Orange: Trying to connect.
- Blue: Created its own wifi network. It should be named something like PIXEL_KIT_XXXX but with a number instead of the XXXX.
- Green: Connected to a wifi network.
- Red: Tried to connect to a wifi network and failed.

## Blue Screen

The blue screen is a very special screen as it will allow you to connect to your Pixel Kit anywhere, without cables, with or without internet or available wifi networks.

The first time your Pixel Kit boots it will always display the blue screen. The Pixel Kit ip address while displaying the blue screen will never change: it will always be `192.168.4.1`.

At any time, turn your Pixel Kit off and on again while holding both red buttons to gently force it to show the blue screen.

This is very useful if you have connected to the wrong wifi network, one that is not available anymore, to code offline or to connect to a new network.

## Connecting to a wifi network

While connected on the network created by the Pixel Kit you won't have access to internet. If you want to code and have access to internet you must connect the Pixel Kit to a wifi network that has internet. The computer you will use to code must be connected to the same network.

The easiest way to connect is to run `saveWifiConf(ssid, passord)` on the REPL where `ssid` is the name of the network you want your Pixel Kit to connect and `password` is the network password.  Something like this:

```python
saveWifiConf('KanoGuest', 'everyonecanmake')
```

This will save this information on a file called `wifi.py` that is used by Pixel Kit on boot. After running `saveWifiConf(ssid, password)`, you must turn your Pixel Kit off and on again to apply the changes.

<div id="pixel-turtle"></div>

# Pixel Turtle Guide

## Position and heading

If you turn on your Pixel Kit and only see a green and a yellow pixel it's because you probably have the Pixel Turtle library installed and running on your Pixel Kit already!

Otherwise run the execute code:

```python
from PixelTurtle import *
```
Imagine the green pixel as if it was a turtle seen from above and the yellow pixel is where the turtle is heading for. This is what you can tell it to do:

## Left and right

You can turn the turtle around by using the commands `left()` and `right()`. If you just call `left()` or `right()` you will turn your turtle only by one “step”. If you call `left(2)` it’s the same as calling `left()` twice.

Try this example and see what happens:

```python
from PixelTurtle import *

left()
left(1)
right(3)
```

## Forward and backward

If you call `forward()` or `backward()` the turtle will step forward or backwards in the current heading direction. If you call `forward(2)` it will give 2 steps forward, which is the same as calling `forward()`
twice.

Try this example and see what happens:

```python
from PixelTurtle import *

left()
forward(2)
left(2)
forward(2)
left(3)
forward(4)
```

## Setting color

You can change your turtle to be another color by calling `setColor(blue)` for example. There are 8 colors ready for you to choose: `red`, `green`, `blue`, `yellow`, `cyan`, `purple`, `black`, `white`.

If none of those is your favourite color, you can create your own. For example if you want to create a dark blue color you would type something like `dark_blue = [0, 0, 5]` and then set your color `setColor(dark_blue)`.

Try this example and see what happens:

```python
from PixelTurtle import *

left(2)
setColor(red)
forward()
setColor(yellow)
forward()
setColor(green)
forward()
setColor(cyan)
forward()
setColor(blue)
forward()
setColor(purple)
forward()
left(2)
setColor(white)
```

## Pen up and pen down

You might have noticed that every time you move around with your turtle it leaves a trace behind. This is because the “pen is down”, which means wherever you go, you will be dragging the pen on the “floor”. If you want to move around without drawing you can call `penUp()` which will lift the pen until you call `penDown()` again.

Try this example and see what happens:

```python
from PixelTurtle import *

forward(3)
left(2)
penUp()
forward(2)
penDown()
left(2)
forward(3)
right(2)
penUp()
forward(2)
penDown()
right(2)
forward(3)
```

## Clearing screen

You can clear all the drawings you have made on screen by calling `clear()`.

Try this example and see what happens:

```python
from PixelTurtle import *

forward(4)
backward(4)
clear()
```

## Move

Teleport your pixel turtle `x` steps on the horizontal and `y` steps on the vertical based on your current pixel turtle positon. The steps can be negative numbers and numbers grow to the right and down.

Try this example and see what happens:

```python
from PixelTurtle import *

move(2, 0)
move(0, 2)
move(-2, 0)
move(0, -2)
```

## Move To


Teleport your pixel turtle to the column `x` and line `y` of your Pixel Kit. The pixel on the top left corner is the row `0` and column `0`. The numbers grow to the right and down (the pixel on bottom right is row `7` and column `15`).

Try this example and see what happens:

```python
from PixelTurtle import *

moveTo(2, 0)
moveTo(0, 2)
moveTo(5, 0)
moveTo(5, 2)
```

## Show and Hide Pixel


Makes the pixel invisible. You can still call all the commands normally and it the pixel turtle will behave just as if it was visible, including leaving a trace on the color you set.

Try this example and see what happens:

```python
from PixelTurtle import *

hidePixel()
setColor(blue)
left(2)
forward(4)
showPixel()
```

## Show and Hide Heading


Makes the heading invisible. You can still call all the commands normally and it the pixel turtle will behave just as if it was visible, including leaving a trace on the color you set.

Try this example and see what happens:

```python
from PixelTurtle import *

hideHeading()
left(1)
forward(3)
right(3)
showHeading()
```

## Setting Heading Color


Imagine you want to make a drawing where the background is the same yellow as the heading or another color that makes really hard to see it. With `setHeadingColor()` you can set the heading color to another one so it makes a good contrast with your background.

You can use the same colors as in `setColor()`: `red`, `green`, `blue`, `yellow`, `cyan`, `purple`, `black`, `white`. Or you can create your own color like `dark_blue = [0, 0, 5]` and then set your heading color `setHeading(dark_blue)`.

Try this example and see what happens:

```python
from PixelTurtle import *

import PixelKit as kit
kit.set_background(yellow)
kit.render()
setHeadingColor(green)
left(1)
forward(2)
right(3)
```

## Get X and Y

If you want to know what is the current `x` or `y` coordinate of your pixel turtle you can call `getX()` and `getY()` on your console and you will get a number printed. If you want to use in your code you can assign the current value "returned" by `getX()` or `getY()`.

Try this example and see what happens:

```python
from PixelTurtle import *

penUp()
clear()
while True:
	current_y = getY()
	if current_y == 7 or current_y == 0:
		left(4)
		forward()
```

## Aliases

If you get tired of writing the same thing over and over and over you might use the aliases for each command. Aliases are other words for the same command, in this case the aliases are the first letters of the command:

- `sc()` is for `setColor()`
- `shc()` is for `setHeadingColor()`
- `mt()` is for `moveTo()`
- `m()` is for `move()`
- `sp()` is for `showPixel()`
- `hp()` is for `hidePixel()`
- `sh()` is for `showHeading()`
- `hh()` is for `hideHeading()`
- `pd()` is for `penDown()`
- `pu()` is for `penUp()`
- `f()` is for `forward()`
- `b()` is for `backward()`
- `l()` is for `left()`
- `r()` is for `right()`
- `c()` is for `clear()`

<div id="pixel-kit"></div>

# Pixel Kit Library Guide

If you are familiar with Pixel Turtle already this will be much easier. Pixel Turtle has a list of instructions, commands and options that are written using Pixel Kit Library under the hood. Pixel Turtle is made to be simple to understand and Pixel Kit library is made to write advanced and more optimal code.

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

On Pixel Turtle, every time we tell a word like `forward()` the turtle automatically move forward and draw on screen (if the "pen" is down). That is very useful but presents a problem:

What happens if we want a full drawing to appear on the screen at once?

For example if we want to color the entire screen at once, we can't do that with Pixel Turtle because it will draw line by line, column by column and the screen will get color in different moments.

So that is why in Pixel Kit library we separate drawing in two phase:

### Buffer

When we call the drawing commands on Pixel Kit library, nothing will be updated on the LEDs. That is because we are not drawing directly to the LEDs. Imagine we are drawing on a ghost screen that eventually we can stamp into the real LED screen. This ghost screen is what we call a "buffer". All the drawing commands on Pixel Kit are actually drawing on the buffer and not directly on the screen.

The reason for drawing on a buffer first is that we want to be able to finish our drawing first and then draw it at once on our screen.

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

When combined with repetition and functions we can draw anything we imagine (and fits on the Pixel Kit LEDs):

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

There are a few ways to ask Pixel Kit if a button is pressed and what to do when this it's pressed. The same works for the dial on top of Pixel Kit. It's usually helpful to understand what are the options before choosing which is the best for us. Each way to ask values will give us some advantages and some disadvantages.

Before we can read the buttons and dial, let's list all the available buttons.

On the bottom left corner of our Pixel Kit we have the **joystick**. It can go up, down, left, right and we can click it without any directions.

On the bottom right corner we have our **button A** and **button B**. Button A is the one on the left and Button B is the one on the right.

On top of our Pixel kit you will find the dial. There are some drawings on it to help us know how what is it's rotation. Next to the dial, on the transparent plastic to the right we can see a mark in form of a little bump. Think it as an arrow to indicate what is the current dial value.

### Reading button values

The quick way to know if a button is pressed is by checking its value. You can check it by evaluating its value on the console or by printing the value. To print the value of the button A we can write something like this:

```python
print(kit.button_a.value())
```

And we will see on the console a number `0` or `1`. If the buttons is being pressed it will be `0`, else it will be `1`. Try executing the previous code without holding the button A and after try executing it holding the button.

### Taking decisions based on button values

If you don't like to print the value you can use the LEDs to tell you if the button is pressed or not. For that we can store the button value on a variable and make a decision based on it. The code would be something like this:

```python
buttonAValue = kit.buttonA.value()
if buttonAValue == 1:
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
  buttonAValue = kit.buttonA.value()
  if buttonAValue == 1:
    kit.set_background(yellow)
  else:
    kit.set_background(green)
  kit.render()
  sleep(0.1)
```

Since `True` will never be set to `False`, the only way to stop the program is by interrupting it's execution or turning the board off and on again.

As long you hold the button A pressed, it keeps the `green` background. That is because you are executing the `kit.set_background(green)` every time the code runs.

Notice the `sleep()` command being imported on the begining of the code and used after we `render()` our background color. What it does is to stop the execution for `0.1` seconds before it repeats, limiting it to run no more than 10 times every second. This is a safety measurement to avoid crashing the Pixel Kit by asking it to do too many things too fast.

### Dial value

We can also check what is the dial value. It's as simple as checking the button except instead of calling `buttonA.value()` for example we'll call `dial.read()`. The code is something like this:

```python
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

<div id="programming-in-python"></div>

# Programming in Python

Pixel Kit and Pixel turtle Turtle are libraries written in MicroPython. MicroPython is a simplified version of Python, a very powerful programming language. Most things on MicroPython are the same as in Python so for that reason we will just talk about Python.

We can do almost anything with Python, it has many features, libraries and a lot of people out there are writing programs, games, animations, websites with Python. But to start understanding its power we'll go through 4 very important and powerful ideas that we'll be using as tools to draw and interact with Pixel Kit! They are **variables**, **conditions**, **repetition** and **functions**.

If you read and don't understand, don't worry: ***The best way to understand those ideas is trying to use them on a project***!

## Variables

Variables are like drawers in a shelf. You can put almost anything on this drawer and you can give it a label as well. So let’s imagine you want to put your favorite color on a drawer named `orange`, that is how you do it:

```python
orange = [10, 5, 0]
```

Not we can use the word `orange` every time we want to refer to that color:

```python
setColor(orange)
```

But what if we want to have a variable with the list of colors we want to draw? We do the same way we did before:

```python
colors = [white, yellow, cyan, purple, orange]
```

It’s important to remember that we can create variables with many different values: Numbers, words, array, etc:

```python
width = 16
height = 8
orange = [10, 5, 0]
name = "Banana Banana"
colors = [white, black, orange]
```

## Conditions

Conditions are the way we tell the computer to make decisions. To create a condition we basically need to compare two values and depending if the comparison is true we tell the computer to do something, otherwise we do something else.


For example if we want to draw a line but we want it to have 2 colors we could do something like this:

```python
for i in range(0, 10);
    if i > 5:
        setColor(green)
    else:
        setColor(cyan)
    forward()
```

## Repetition

In programming there are many shortcuts. The shortcut for repeating the same thing over and over is called “repetition loops” or just “loops”.

Loops are a way to tell the computer to execute a set of instructions many times. If we want pixel turtle to walk forward and turn left 8 times we can write `forward()` and `left()` 8 times or we can simple write this:

```python
for i in range(0, 8):
    forward()
    left()
```

Notice that we use the variable `i` and the function `range(0, 8)`. What are those?

The function `range(0, 8)` is the way we tell the computer to create an array of numbers with 8 items from 0 to 7. But why until 7? Because if we count from 0 to 7 we have 8 numbers:

```python
[0, 1, 2, 3, 4, 5, 6, 7]
```

Every time the loop start `i` will be equal to one of the items on the array. First time it runs `i` will be equals to 0, then it will be equals to 1, then 2, then 3 and it goes until it’s equal to 7.

That works if you have already an array. For example imagine you defined the following array of colors:

```python
colors = [ white, red, yellow, green, cyan, blue, purple, white ]
```

Now we can “iterate” over this array and our `i` variable will be equals to every color on our array:

```python
for i in colors:
    setColor(i)
    forward()
    left()
```

## Functions

There are shortcuts that are ready for us to use such as variables, loops and many others. But we can create our own shortcuts as well! The way we create them is by defining functions. Functions are basically a set of instructions we give a name, very similar to what we did with variables. But the way we do it looks a bit different. Imagine we want to create a shortcut to draw squares, we can do something like this:

```python
def square():
    for i in range(0, 4):
        forward(2)
        left(2)
```

After defining `square()`, we can draw squares by just telling the computer to execute `square()` the same way we do with `forward()`, `left()` or `setColor()`.

```python
setColor(white)
square()
```

The same way we can put a number between the parentheses with `forward(3)`, we can create shortcuts like that as well! The way we can do it is like this:

```python
def square(n=1):
    for i in range(0, 4):
        forward(n)
        left(2)
```

Notice that the `n=1` is there to tell the computer we are expecting a number n but if nothing is specified, use 1 as the default value. Now we can not only draw squares but tell how big will be the square!

```python
setColor(green)
square()
setColor(red)
square(3)
```
