# Pixel32 - Code MicroPython on your Pixel Kit on the browser!

![](https://i.imgur.com/bGmm57E.png)

Check [more the screenshots here](https://imgur.com/a/AEzbgcb)

Pixel32 is a MicroPython application running on Kano Pixel Kit that allows it to be programmed on the browser.

## Installing Pixel32: The easy way

Download [Pixel Kit Flash Tool](https://github.com/murilopolese/kano-pixel-kit-flash-tool) and flash MicroPython on it (it's actually Pixel32).

## Installing Pixel32: The hard way

Check [Building](#building) below.

## Basic usage

The first time your Pixel Kit boots it will always display the blue screen. At this point, Pixel Kit has created its own wifi network and it should be named something like PIXEL_KIT_XXXX but with a number instead of the XXXX.

When you connect to this wifi network you can either wait for the Captive Portal page to pop up or go to your browser, type http://192.168.4.1 and start exploring.

The Pixel Kit ip address while displaying the blue screen will never change: it will always be `192.168.4.1`. Learn more about the blue screen on the [documentation](www/docs.md#boot-screens).

## Features

- Includes `microWebSrv`, `MicroDNSSrv`, `PixelKit` and `PixelTurtle` libraries. Check [python folder](python) to read the source code.
- It has WebREPL enabled.
- Boot sequence that can either connect to a wifi or start it's own wifi network.
- Once connected, displays the board's ip address in binary format on the screen.
- Host a html page that allow you to connect and code your Pixel Kit on the browser.
- You can connect to the Pixel Kit by typing the ip address in decimal or binary format on the html page hosted by the board.
- When connected to the wifi network created by the Pixel Kit, it starts a captive portal: Once you connect to this wifi it will pop up the terminal for you automagically.
- Host full documentation on how to connect, use `PixelKit` and `PixelTurtle` libraries and a very quick Python introduction. This documentation is hosted by the board on `http://IPADDRESS/docs.html` and on [GitHub](www/docs.md).
- Both terminal and documentation can be saved on your computer by typing `CONTROL + S` or `COMMAND + S`. You can run them locally by simply double clicking the `html` file you saved.

## Known problems/bugs:

- Ctrl+c and Ctrl+v is not working.
- On captive portal, if you go to docs, when you come back the websocket connection is lost.
- There is no documentation to say you can access the terminal page on Pixel Kit’s ip address.
- There is no documentation explaining people can save the terminal and docs offline.

## Building

### Building the front end

1. Run `yarn install` on `www` folder
1. Run `yarn run build` on `www` folder

### Flashing Pixel32 to Pixel Kit (MicroPython and files)

1. Run `pip install -r requirements.txt` on `python` folder
1. Run `sh flash /path/to/your/pixel/kit` on `python` folder replacing `/path/to/your/pixel/kit` by the serial port path of your Pixel Kit

### Extracting firmware from Pixel Kit

1. Run `sh dump /path/to/your/pixel/kit` on `python` folder to dump its firmware to `dist/pixel32-v0.1.0.bin` (this can take a while)
