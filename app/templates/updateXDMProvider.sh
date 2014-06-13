#!/bin/sh
npm update madlib-xdm-provider && cd node_modules/madlib-xdm-provider && npm install && rm -rf ../../static_content/xdm && cp -r dist/src ../../static_content/xdm