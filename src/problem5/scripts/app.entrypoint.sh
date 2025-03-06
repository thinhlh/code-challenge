#!/bin/sh

yarn migrate:latest
yarn prestart
yarn seed

yarn build
yarn start