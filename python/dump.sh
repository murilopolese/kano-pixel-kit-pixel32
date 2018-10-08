rm -rf dist > /dev/null
mkdir dist
esptool.py -p $1 read_flash 0x0 0x400000 dist/pixel32.bin
