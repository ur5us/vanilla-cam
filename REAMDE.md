# What is this?

This is a little demo showcasing QR code scanning. It allows changing camera
for devices offering more than 1. However, doing so, can result in Zxing
crashing as it can’t get access to a video input stream, especially when
switching between standard and wide angle lenses. The underlying issue
seems to be related to timing. With an artifical delay of 250ms and up camera
switching seems to work reliably, at least on a Samsung S22 Android phone. It’s
possible that a value between 101 – 249 will also work but I haven’t tested it.
