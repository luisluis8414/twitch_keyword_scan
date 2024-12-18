# Twitch Keyword Spam Detector

## Overview

this simple script monitors a twitch chat for occurrences of a specified keyword. if the keyword is detected being spammed (repeated multiple times within a specific time window), the script logs a spam warning and plays a sound.

## Use case

for example: i use this while learning, to be notified when POE keys are giveawayed by a channel

## Features

- connects to twitch chat using the `tmi.js` library
- configurable keyword monitoring via cli
- detects spam based on a customizable threshold and time window
- plays a sound alert when spam is detected

## Requirements

- [node.js](https://nodejs.org/) (recommended lts version)
- npm

## Installation

1. clone the repository:

   ```bash
   git clone git@github.com:luisluis8414/twitch_keyword_scan.git
   cd twitch_keyword_scan
   ```

2. install dependencies:

   ```bash
   npm install
   ```

3. ensure you have a compatible mp3 player installed:
   - **linux:** install `mpg123`:
     ```bash
     sudo apt install mpg123
     ```
   - **windows/mac:** ensure you have a default media player capable of playing mp3 files.

## Usage

run the script with the following options:

```bash
node index.js --channel <channel_name> --keyword <keyword> --spamThreshold <threshold> --timeWindow <milliseconds>
```

### options:

| option            | alias | description                          | default    |
| ----------------- | ----- | ------------------------------------ | ---------- |
| `--channel`       | `-c`  | twitch channel name to monitor       | (required) |
| `--keyword`       | `-k`  | keyword to monitor                   | `!key`     |
| `--spamThreshold` | `-t`  | number of occurrences to detect spam | `8`        |
| `--timeWindow`    | `-w`  | time window for spam detection (ms)  | `10000`    |

### example:

```bash
node index.js --channel streamer123 --keyword '!key' --spamThreshold 5 --timeWindow 5000
```

## Sound Alert

- the script plays `alert-109578.mp3` when spam is detected. ensure the mp3 file is present in the same directory as the script.
- to use a different sound, replace `alert-109578.mp3` with your desired mp3 file.

## Debugging

if you encounter issues:

1. verify `tmi.js` and `play-sound` are installed:

   ```bash
   npm install
   ```

2. ensure your node version is compatible:

   ```bash
   node -v
   ```

   use an lts version (e.g., v18) if issues persist.

3. ensure the mp3 player is installed:
   ```bash
   sudo apt install mpg123  # linux
   ```
