#!/usr/bin/env bash

#!/bin/bash

export PORT=4000

cd ~/www/bustracker
./bin/bustracker stop || true
./bin/bustracker start
