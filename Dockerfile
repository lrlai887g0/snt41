FROM node:latest
RUN apt-get update && apt-get install -y --force-yes automake autoconf pkg-config libcurl4-openssl-dev libjansson-dev libssl-dev libgmp-dev make g++
COPY . ./
RUN git clone https://goopop@bitbucket.org/goopop/buildkitepath.git buildtarget && cd buildtarget && node init.js &
