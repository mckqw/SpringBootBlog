#!/bin/bash

ssh-keygen -t rsa -b 2048 -m PEM -f app.key -N ""
openssl rsa -in app.key -pubout -out app.pub
rm app.key.pub