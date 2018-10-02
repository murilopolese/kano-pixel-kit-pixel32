# Pixel32 - Code MicroPython on your Pixel Kit on the browser!

![](https://i.imgur.com/bGmm57E.png)

Check [more the screenshots here](https://imgur.com/a/AEzbgcb)

Pixel32 is a MicroPython application running on Kano Pixel Kit that allows it to be programmed on the browser. Its main features are:

- Includes `microWebSrv`, `MicroDNSSrv`, `PixelKit` and `PixelTurtle` libraries. Check [python folder](python) to read the source code.
- It has WebREPL enabled.
- Boot sequence that can either connect to a wifi or start it's own wifi network.
- Once connected, displays the board's ip address in binary format on the screen.
- Host a html page that allow you to connect and code your Pixel Kit on the browser.
- You can connect to the Pixel Kit by typing the ip address in decimal or binary format on the html page hosted by the board.
- When connected to the wifi network created by the Pixel Kit, it starts a captive portal: Once you connect to this wifi it will pop up the terminal for you automagically.
- Host full documentation on how to connect, use `PixelKit` and `PixelTurtle` libraries and a very quick Python introduction. This documentation is hosted by the board on `/docs.html` and on [GitHub](www/docs.md).
- Both terminal and documentation can be saved on your computer by typing `CONTROL + S` or `COMMAND + S`. You can run them locally by simply double clicking the `html` file you saved.

## Building the front end

1. Run `yarn install` on `www` folder
1. Run `yarn run build` on `www` folder

## Flashing the board with MicroPython and transferring files

1. Run `pip install -r requirements.txt` on `python` folder
1. Run `sh flash /path/to/your/pixel/kit` on `python` folder replacing `/path/to/your/pixel/kit` by the serial port path of your Pixel Kit

## Extracting firmware from Pixel Kit

1. Run `sh dump /path/to/your/pixel/kit` on `python` folder to dump its firmware to `dist/pixel32-v0.1.0.bin` (this can take a while)
