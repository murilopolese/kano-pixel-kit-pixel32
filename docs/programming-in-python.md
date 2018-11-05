---
layout: documentation
---

# Programming in Python

Pixel Turtle is a library written in MicroPython. MicroPython is a simplified version of Python, a very powerful programming language. Most of the things on MicroPython are the same as in Python so for that reason we will just talk about Python.

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
