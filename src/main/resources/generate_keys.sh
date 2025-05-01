#!/bin/bash

ssh-keygen -t rsa -b 2048 -m PEM -f app.key -N ""
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in app.key -out app.key
openssl rsa -in app.key -pubout -out app.pub