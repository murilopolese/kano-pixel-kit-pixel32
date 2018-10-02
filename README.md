# Pixel32 - Code MicroPython on your Pixel Kit on the browser!

Pixel32 is the nickname for the combination of a MicroPython application running on Kano Pixel Kit. Its main features are:

- Includes `microWebSrv`, `MicroDNSSrv`, `PixelKit` and `PixelTurtle` libraries.
- WebREPL enabled.
- Boot sequence that can either connect to a wifi or start it's own wifi network.
- Once connected, displays the board ip address in binary format on the screen.
- Host a terminal/console that allow you to connect and code your Pixel Kit from the browser.
- You can connect to the Pixel Kit by inputing the ip address in decimal or binary format.
- When connected to the wifi network created by the Pixel Kit, it starts a captive portal: Once you connect to this wifi it will pop up the terminal for you automagically.
- Host full documentation of how to connect, use `PixelKit` and `PixelTurtle` libraries and a very quick Python introduction on `/docs.html`. Check [docs.md](www/docs.md) to read it.
- Both terminal and documentation can be saved on your computer by typing `CONTROL + S` or `COMMAND + S`. You can run them by simply double clicking the `html` file you saved.

## Building the front end

1. Run `yarn install` on `www` folder
1. Run `yarn run build` on `www` folder

## Flashing the board with MicroPython and transferring files

1. Run `pip install -r requirements.txt` on `python` folder
1. Run `sh flash /path/to/your/pixel/kit` on `python` folder replacing `/path/to/your/pixel/kit` by the serial port path of your Pixel Kit

## Extracting firmware from Pixel Kit

1. Run `sh dump /path/to/your/pixel/kit` on `python` folder to dump its firmware to `dist/pixel32-v0.1.0.bin` (this can take a while)
