from microWebSrv import MicroWebSrv
from microDNSSrv import MicroDNSSrv
import PixelKit as kit
import json
import os
import socket
from _thread import start_new_thread
from time import sleep

def ls(path=''):
    for f in os.listdir(path):
        print(f)

if not sta.active() and ap.active():
	ip = ap.ifconfig()[0]
	MicroDNSSrv.Create({ '*' : ap.ifconfig()[0] })
elif sta.active() and not ap.active():
	ip = sta.ifconfig()[0]

try:
	if srv:
		srv.Stop()
except NameError as err:
	srv = MicroWebSrv(webPath='')

srv.SetNotFoundPageUrl("http://{}/index.html".format(ip))
srv.Start()
kit.set_pixel(0, 0, [10, 10, 10])
kit.render()
