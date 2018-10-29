const asciiHeader = `     __\r
   _[  ]___________\r
  |oooooooooooooooo|   KANO PIXEL KIT\r
  |oooooooooooooooo|   Code with light.\r
  |oooooooooooooooo|\r
  |oooooooooooooooo|   https://kano.me/\r
  | O          O O |\r
  |________________|\r
`
const offlineBootMsg = `\r
Oh, hi! You are currently disconnected from \r
your Pixel Kit.\r
\r
Type the ip in decimal or binary format to\r
connect. Type help if you have questions.\r
`
const onlineBootMsg = `\r
Nice! You are currently connected to \r
the MicroPython REPL on your Pixel Kit!\r
\r
REPL stands for Read, Evaluate, Print\r
and Loop. Type docs() to learn more.\r
`
const offlineHelpMsg = `
\r\x1b[38;2;102;217;239m
╔=========================================╗\r
║                CONNECTING               ║\r
╚=========================================╝\r
\r\x1b[38;2;255;255;255m
When your Pixel Kit is connected to a wifi\r
network it will display its ip address in\r
binary format. Red dots mean 1, no dots\r
mean 0.\r
\r
Check if your Pixel Kit and computer are on\r
the same network (either the one Pixel Kit\r
created itself or the one you connected it\r
to) and type the ip address in binary or \r
decimal format. It will look something \r
like this:\r
\r
> 11000000101010000000010000000001\r
or\r
> 192.168.4.1\r
\r\x1b[38;2;102;217;239m
╔=========================================╗\r
║              BOOT SCREENS               ║\r
╚=========================================╝\r
\r\x1b[38;2;255;255;255m
When your Pixel Kit boots up it shows a few\r
screens to let you know what it's doing and\r
its state. Here is what they mean:\r
\r
- \x1b[38;2;253;151;31mOrange\x1b[38;2;255;255;255m\r
  Trying to connect.\r
\r
- \x1b[38;2;102;217;239mBlue\x1b[38;2;255;255;255m\r
  Created its own wifi network. It should\r
  be named something like PIXEL_KIT_XXXX\r
  but with a number insted of the XXXX.\r
\r
- \x1b[38;2;166;226;46mGreen\x1b[38;2;255;255;255m\r
  Connected to a wifi network.\r
\r
- \x1b[38;2;249;38;114mRed\x1b[38;2;255;255;255m\r
  Tried to connect to a wifi network and\r
  failed.\r
\r
At any time, turn your Pixel Kit off and on\r
again while holding both red buttons to \r
gently force your Pixel Kit to show the \r
blue screen.\r
\r
`
