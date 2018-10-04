echo 'Erasing board'
esptool.py -p $1 erase_flash > /dev/null
echo 'Flashing MicroPython v1.9.4'
esptool.py -p $1 write_flash 0x1000 ./esp32-20181002-v1.9.4-623-g34af10d2e.bin > /dev/null

sleep 1

echo 'Removing default boot.py'
ampy -p $1 rm src/boot.py
echo 'Transfering files:'
echo '- PixelKit.py'
ampy -p $1 put src/PixelKit.py
echo '- PixelTurtle.py'
ampy -p $1 put src/PixelTurtle.py
echo '- microDNSSrv.py'
ampy -p $1 put src/microDNSSrv.py
echo '- microWebSrv.py'
ampy -p $1 put src/microWebSrv.py
echo '- webrepl_cfg.py'
ampy -p $1 put src/webrepl_cfg.py
echo '- boot.py'
ampy -p $1 put src/boot.py
echo '- main.py'
ampy -p $1 put src/main.py
echo '- index.html'
ampy -p $1 put ../www/dist/index.html.gz index.html
echo '- docs.html'
ampy -p $1 put ../www/dist/docs.html.gz docs.html

echo 'DONE'
