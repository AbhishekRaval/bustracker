#!/usr/bin/env bash

export PORT=4000
export MIX_ENV=prod
export GIT_PATH=/home/bustracker/src/Bustracker/bustracker

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "bustracker" ]; then
	echo "Error: must run as user 'bustracker'"
	echo "  Current user is $USER"
	exit 2
fi


mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod
mix ecto.reset

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/bustracker ]; then
	echo mv ~/www/bustracker ~/old/$NOW
	mv ~/www/bustracker ~/old/$NOW
fi

mkdir -p ~/www/bustracker
REL_TAR=~/src/Bustracker/bustracker/_build/prod/rel/bustracker/releases/0.1.0/bustracker.tar.gz
(cd ~/www/bustracker && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/bustracker/src/Bustracker/start.sh
CRONTAB

#. start.sh
