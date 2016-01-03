#!/usr/bin/env bash

xrandr --newmode "1024x600"   49.00  1024 1072 1168 1312  600 603 613 624 -Hsync +Vsync

xrandr --addmode HDMI-1 "1024x600"

xrandr --output HDMI-1 --mode "1024x600"
