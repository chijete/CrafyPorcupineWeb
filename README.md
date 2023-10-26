# CrafyPorcupineWeb
PorcupineWeb instance: Porcupine Wake Word (offline voice keyword detection) with async script load.

## Porcupine Picovoice instance
Original repository: https://github.com/Picovoice/porcupine
Official documentation: https://picovoice.ai/docs/quick-start/porcupine-web/

## How to use
Complete example in index.php

## How to add custom keyword
1. Train model in https://console.picovoice.ai/ppn
2. Download for "Web (WASM)"
3. Copy .ppn file to lib/keywords/
4. Use method setKeyword of CrafyPorcupineWeb class.

## How to change or update model
1. Download new model from https://github.com/Picovoice/porcupine/tree/master/lib/common
2. Copy .pv file to lib/models/
3. In file lib/models/porcupineModel.js, rewrite the parameters "publicPath" and "customWritePath" of var "porcupineModel".

## How to update library
Update the folder lib/node_modules using npm.
`npm install @picovoice/web-voice-processor @picovoice/porcupine-web`
