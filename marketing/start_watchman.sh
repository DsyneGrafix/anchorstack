#!/bin/bash
cd "$HOME/Desktop/Python Script"
source "$HOME/watchman-env/bin/activate"
python watchman_web.py &
sleep 2
xdg-open http://127.0.0.1:5000
read -p "Press [ENTER] to close this window..."
