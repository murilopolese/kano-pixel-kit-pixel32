from microWebSrv import MicroWebSrv
import PixelKit as kit
import json
import os
import _thread
from time import sleep

ws = None

def _acceptWebSocketCallback(webSocket, httpClient) :
	global ws
	print("WS ACCEPT")
	webSocket.RecvTextCallback   = _recvTextCallback
	webSocket.RecvBinaryCallback = _recvBinaryCallback
	webSocket.ClosedCallback 	 = _closedCallback
	ws = webSocket

def _recvTextCallback(webSocket, msg) :
	try:
		data = json.loads(msg)
		if data['messageType'] == 'requestAction':
			process_action(data)
	except Exception as e:
		print(e)

def _recvBinaryCallback(webSocket, data) :
	# print("WS RECV DATA : %s" % data)
	pass

def _closedCallback(webSocket) :
	print("WS CLOSED")
	pass


def process_action(data):
	if 'listdir' in data['data']:
		path = ''
		if data['data']['listdir']:
			path = data['data']['listdir']
		files = os.listdir(path)
		send_event('listdir', { "path": path, "list": files })

	if 'load_file_content' in data['data']:
		with open(data['data']['load_file_content'], 'r') as f:
			send_event(
				'load_file_content',
				{ "path": data['data']['load_file_content'], "content": f.readlines() }
			)

	if 'create_file' in data['data']:
		fname = data['data']['create_file']['path']
		content = data['data']['create_file']['content']
		with open(fname, 'w') as f:
			f.write(content)
		send_event('create_file', fname)

	if 'remove_file' in data['data']:
		fname = data['data']['remove_file']
		os.remove(fname)
		send_event('remove_file', fname)

	if 'exec' in data['data']:
		try:
			code = data['data']['exec']
			exec(code)
		except Exception as ex:
			log(ex)
		send_event('code_executed', True)

	if 'clear' in data['data']:
		kit.clear()

	if 'set_background' in data['data']:
		values = data['data']['set_background'] # [r, g, b]
		kit.set_background(values)

	if 'set_pixels' in data['data']:
		values = data['data']['set_pixel'] # (x, y, [r, g, b])
		for value in values:
			kit.set_pixel(value[0], value[1], value[2])

	if 'set_pixel' in data['data']:
		values = data['data']['set_pixel'] # (x, y, [r, g, b])
		kit.set_pixel(values[0], values[1], values[2])

	if 'render' in data['data']:
		kit.render()
try:
	if srv:
		srv.Stop()
except NameError as err:
	srv = MicroWebSrv(webPath='')

srv.MaxWebSocketRecvLen     = 4096*2
srv.WebSocketThreaded		= True
srv.AcceptWebSocketCallback = _acceptWebSocketCallback
srv.Start()

kit.set_pixel(0, 0, [10, 10, 10])
kit.render()

def send_event(name, value):
	event = { "messageType": "event", "data": {}}
	event['data'][name] = value
	try:
		ws.SendText(json.dumps(event))
	except NameError as err:
		print('Connection not opened')
	except Exception as err:
		print(err)

def log(*args):
	send_event('log', args)

if ws:
	send_event('ready', True)
