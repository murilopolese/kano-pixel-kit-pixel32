'''
Kano PixelKit.py v1.0
'''

from machine import Pin, ADC
from neopixel import NeoPixel

# Hardware information:
# Pin numbers for each hardware connected to the PixelKit ESP32
NEOPIXEL_PIN = 4
SIZE = 128 # Amount of leds
WIDTH = 16 # Number of columns
HEIGHT = 8 # Number of lines
DIAL_PIN = 36
JOYSTICK_UP_PIN = 35
JOYSTICK_DOWN_PIN = 34
JOYSTICK_LEFT_PIN = 26
JOYSTICK_RIGHT_PIN = 25
JOYSTICK_CLICK_PIN = 27
BUTTON_B_PIN = 18
BUTTON_A_PIN = 23
BUTTON_NONE_PIN = 5 # dunno what is this

# Hardware instances
# Objects representing the available hardware on the PixelKit
neopixel_pin = Pin(NEOPIXEL_PIN, Pin.OUT)
np = NeoPixel(neopixel_pin, SIZE)
np.timing = 1 # This will set the neopixel frequency correctly
joystick_up = Pin(JOYSTICK_UP_PIN, Pin.IN)
joystick_down = Pin(JOYSTICK_DOWN_PIN, Pin.IN)
joystick_left = Pin(JOYSTICK_LEFT_PIN, Pin.IN)
joystick_right = Pin(JOYSTICK_RIGHT_PIN, Pin.IN)
joystick_click = Pin(JOYSTICK_CLICK_PIN, Pin.IN)
button_a = Pin(BUTTON_A_PIN, Pin.IN)
button_b = Pin(BUTTON_B_PIN, Pin.IN)
# button_none = Pin(BUTTON_NONE_PIN, Pin.IN)
dial = ADC(Pin(DIAL_PIN))
dial.atten(ADC.ATTN_11DB)

# Hardware values
# Values based on the available hardware
dial_value = dial.read()
is_pressing_up = False
is_pressing_down = False
is_pressing_left = False
is_pressing_right = False
is_pressing_click = False
is_pressing_a = False
is_pressing_b = False

# Group all the other functions to check the hardware
def check_controls():
    check_joystick()
    check_buttons()
    check_dial()

# Checks the joystick, "debounce" the presses and calls the
# function related to which joystick button was pressed
def check_joystick():
    global is_pressing_up
    global is_pressing_down
    global is_pressing_left
    global is_pressing_right
    global is_pressing_click
    if joystick_up.value() == 0 and not is_pressing_up:
        is_pressing_up = True
        on_joystick_up()
    if joystick_up.value() != 0 and is_pressing_up:
        is_pressing_up = False

    if joystick_down.value() == 0 and not is_pressing_down:
        is_pressing_down = True
        on_joystick_down()
    if joystick_down.value() != 0 and is_pressing_down:
        is_pressing_down = False

    if joystick_left.value() == 0 and not is_pressing_left:
        is_pressing_left = True
        on_joystick_left()
    if joystick_left.value() != 0 and is_pressing_left:
        is_pressing_left = False

    if joystick_right.value() == 0 and not is_pressing_right:
        is_pressing_right = True
        on_joystick_right()
    if joystick_right.value() != 0 and is_pressing_right:
        is_pressing_right = False

    if joystick_click.value() == 0 and not is_pressing_click:
        is_pressing_click = True
        on_joystick_click()
    if joystick_click.value() != 0 and is_pressing_click:
        is_pressing_click = False

# Checks the buttons, "debounce" the presses and calls the
# function related to which button was pressed
def check_buttons():
    global is_pressing_a
    global is_pressing_b
    if button_a.value() == 0 and not is_pressing_a:
        is_pressing_a = True
        on_button_a()
    if button_a.value() != 0 and is_pressing_a:
        is_pressing_a = False
    if button_b.value() == 0 and not is_pressing_b:
        is_pressing_b = True
        on_button_b()
    if button_b.value() != 0 and is_pressing_b:
        is_pressing_b = False

# Checks the dial value and only set the hardware value and call the
# function related with the dial if the new value is different from the previous
def check_dial():
    global dial_value
    newValue = dial.read()
    if newValue != dial_value:
        dial_value = dial.read()
        on_dial(dial_value)

# Called when those hardware change values
def on_joystick_up():
    return False
def on_joystick_down():
    return False
def on_joystick_left():
    return False
def on_joystick_right():
    return False
def on_joystick_click():
    return False
def on_button_a():
    return False
def on_button_b():
    return False
def on_dial(dial_value):
    return False

# NeoPixel values are stored in a unidimensional array so to get `x` and `y`
# coordinates it's needed some math to break the values into rows
def get_index_from_coordinate(x, y):
    return ((y) * WIDTH) + (x)

# Set a pixel `color` on coordinates `x` and `y`. This will only set the value
# on the "buffer" (`np`) and won't light any LED by itself. This operation is
# as fast as setting a value to an array
def set_pixel(x, y, color=[0, 10, 0]):
    index = get_index_from_coordinate(x, y)
    np[index] = color

# Set the entire screen to a given color. This will only set the value on the
# "buffer" (`np`) and won't light any LED by itself. This operation is as fast
# as setting a value to an array
def set_background(color=[10,10,0]):
    np.fill(color)

# `setBackground` to black color (turn all the LED off)
def clear():
    set_background([0, 0, 0])

# Send the "buffer" (`np`) values to the hardware. This operation is slower
# since it requires to send the information to the actual hardware and should be
# called as little as possible.
def render():
    np.write()
