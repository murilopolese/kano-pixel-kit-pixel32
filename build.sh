# Usage: sh build [version] [/path/to/pixel/kit]

# Pixel32 Interface (www)
echo "Entering interface folder"
cd www
yarn install
yarn run build
echo "Leaving interface folder"
cd ..

# Pixel32 Firmware (python)
echo "Entering firmware folder"
cd python
echo "Creating virtualenv"
rm -rf .env
virtualenv .env
source .env/bin/activate
pip3 install -r requirements.txt
sh flash.sh $2
sh dump.sh $2
cp dist/pixel32.bin dist/pixel32-v$1.bin
echo "Removing virtualenv"
deactivate
rm -rf .env
echo "Leaving firmware folder"
cd ..
