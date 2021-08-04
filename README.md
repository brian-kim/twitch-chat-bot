# Twitch Chat Bot

## Introduction
A Twitch chat bot for Twitch.tv made with Node.js that uses the Twitch and Spotify API to enhance chat interaction and provide useful functionality for streamers.

This project is meant for me to explore the Twitch API and create a functioning Twich chat bot for my own [stream](https://twitch.tv/danboorubox). Although it can be used by anyone, those looking for a chat bot should look to more established chat bots like [Nightbot](https://nightbot.tv/) and [Moobot](https://moo.bot/).

## Getting Started
1. Navigate to the root directory of the project and run the command `npm install` to install dependencies.
2. Fill in the required information in `fillMeIn.md` and rename the file to `.env` afterwards.

## Deployment
To deploy the app, run `npm run dev` in the root directory of the project.

## Commands
Command | Description
--- | ---
`hello, hey, hi` | Responds to users with a hello message.
`!commands` | Shows current commands.
`!title` | Shows the current stream title.
`!title NEW_TITLE` | Allows broadcaster/mods to change the current stream title.
`!game` | Shows the current stream game.
`!game GAME_TITLE` | Allows broadcaster/mods to change the current stream game.
`!song` | Show current song playing on user's Spotify.
`!8ball (OPTIONAL TEXT)` | Gives a random magic 8-ball outcome
`!random` | Generates a random number from 0 to 100.
`!random NUM` | Generates a random number from 0 to NUM.
`!love TEXT` | Generates a random percentage from 0 to 100 displaying the love between users and TEXT.
`!hate TEXT` | Generates a random percentage from 0 to 100 displaying the hate between users and TEXT.
`!uptime` | Shows the current uptime of the stream in hours and minutes.

All invalid commands will respond with an error message.

## Current Backlog
- Create more commands for users to interact with
- Connect to a DB and create user interactions with it
- Deploy to hosting service.