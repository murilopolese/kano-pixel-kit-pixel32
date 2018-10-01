import PixelKit as kit

# Current position of Pixel [x, y]
cursor = [8, 4]
# Current color of Pixel
color = [0, 10, 0]
# Current color of Pixel heading
headingColor = [3, 3, 0]
# Vectors of headings [x, y]
headings = [ [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1] ]
# Index of current heading vector
heading = 0

# All the pixels. Accessible as `stage[y][x]`
stage = [
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
]

# Flag if the Pixel is visible
pixelVisible = True
# Flag if the Pixel heading is visible
pixelHeadingVisible = True
# Flag if Pixel movement is drawing on `stage`
pixelPenDown = True

# Check if a position is inside the stage
def inStage(x, y):
    return x > -1 and x < 16 and y > -1 and y < 8
# Draw data on `stage` on LEDs
def renderStage():
    for y, row in enumerate(stage):
        for x, col in enumerate(row):
            kit.set_pixel(x, y, stage[y][x])
# Draw pixel on screen (but not on stage)
def renderPixel():
    if pixelVisible and inStage(cursor[0], cursor[1]):
        kit.set_pixel(cursor[0], cursor[1], color)
# Draw heading on screen (but not on stage)
def renderPixelHeading():
    vector = headings[heading]
    nx = cursor[0]+vector[0]
    ny = cursor[1]+vector[1]
    if pixelHeadingVisible and inStage(nx, ny):
        kit.set_pixel(nx, ny, headingColor)
# Draw stage, pixel and heading. Pixel and heading depends on if they are or
# not visible.
def render():
    kit.clear()
    renderStage()
    renderPixel()
    renderPixelHeading()
    kit.render()
# Stamp cursor on stage
def stamp(cursor):
    global stage
    if inStage(cursor[0], cursor[1]):
        stage[cursor[1]][cursor[0]] = color

# USER APIs:
# =======================

# Set pixel color
def setColor(ncolor=[0,10,10]):
    global color
    color = ncolor
    render()
# Set pixel heading color
def setHeadingColor(ncolor=[3,3,0]):
    global headingColor
    headingColor = ncolor
    render()
# Set absolute position of pixel. Origin is on top left and axis grow to right
# and down
def moveTo(x, y):
    global cursor
    cursor[0] = x
    cursor[1] = y
    stamp(cursor)
    render()
# Set relative positon of pixel. Origin is on the pixel current position
def move(x, y):
    global cursor
    cursor[0] = cursor[0] + x
    cursor[1] = cursor[1] + y
    stamp(cursor)
    render()
# Set pixel to be visible
def showPixel():
    global pixelVisible
    pixelVisible = True
    renderPixel()
    render()
# Set pixel to be invisible
def hidePixel():
    global pixelVisible
    pixelVisible = False
    renderPixel()
    render()
# Set heading to be visible
def showHeading():
    global pixelHeadingVisible
    pixelHeadingVisible = True
    renderPixelHeading()
    render()
# Set heading to be invisible
def hideHeading():
    global pixelHeadingVisible
    pixelHeadingVisible = False
    renderPixelHeading()
    render()
# Set the pen down (movement of pixel draws on stage)
def penDown():
    global pixelPenDown
    pixelPenDown = True
# Set the pen up (movement of pixel won't draw on stage)
def penUp():
    global pixelPenDown
    pixelPenDown = False
# Move pixel forward towards heading. If pen is down, stamps position on stage
def forward(n=1):
    global stage
    global cursor
    for i in range(0, n):
        if pixelPenDown:
            stamp(cursor)
        vector = headings[heading]
        cursor[0] = cursor[0]+vector[0]
        cursor[1] = cursor[1]+vector[1]
    if pixelPenDown:
        stamp(cursor)
    render()
# Move pixel backwards in the heading direction. If pen is down, stamps position on stage
def backward(n=1):
    global stage
    global cursor
    for i in range(0, n):
        if pixelPenDown:
            stamp(cursor)
        vector = headings[heading]
        cursor[0] = cursor[0]-vector[0]
        cursor[1] = cursor[1]-vector[1]
    if pixelPenDown:
        stamp(cursor)
    render()
# Rotate heading left
def left(n=1):
    global heading
    heading = (heading - n) % len(headings)
    render()
# Rotate heading right
def right(n=1):
    global heading
    heading = (heading + n) % len(headings)
    render()
# Clear stage
def clear():
    global stage
    stage = [
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
    ]
    render()

def getX():
    return cursor[0]
def getY():
    return cursor[1]
def getHeading():
    return heading

# Aliases
sc = setColor
shc = setHeadingColor
mt = moveTo
m = move
sp = showPixel
hp = hidePixel
sh = showHeading
hh = hideHeading
pd = penDown
pu = penUp
f = forward
b = backward
l = left
r = right
c = clear

render()
