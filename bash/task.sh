#!/bin/bash

cd ./cdn

DATE=$(date +%Y%m%d%H%M)

echo "$FILENAME"

argument=$1

bg1="sandbox"
bg2="pre"

case $argument in 
  $bg1)
    echo "select $argument"
    FILENAME="app.sandbox.tar";
    if [[ -f "$FILENAME" ]]; then
      echo "update"
      rm $FILENAME
    fi
    tar -cf $FILENAME ../public ../static
    ;;
  $bg2)
    echo "select $argument"
    FILENAME="app.$DATE.pre.tar";
    if [[ -f "$FILENAME" ]]; then
      echo "update"
      rm $FILENAME
    fi
    tar -cf $FILENAME ../public
    ;;
  *)
    echo "you need to select a running backgound"
    ;;
esac