#!/bin/sh
set -eu

root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
images="$root/assets/img"

for device in desktop mobile; do
  for theme in light dark; do
    for scale in '' '@2x'; do
      test -f "$images/$device-$theme$scale.png"
    done
  done
done

for device in desktop mobile; do
  for theme in light dark; do
    for scale in '' '@2x'; do
      cwebp -quiet -lossless -exact "$images/$device-$theme$scale.png" -o "$images/$device-$theme$scale.webp"
    done
  done
done

