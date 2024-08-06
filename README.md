# Cogram Chrome Relay
Cogram Chrome Relay helps you capture all moments that matter from your online meetings, livestreams and more.

# What is this?
A React/Node web app that allows to record audio from a tab, a window, an app and your microphone, combines it with display capture and streams it the backend.

# Requirements
- Node v.20

# Built on
- React v. 18
- Next.js v. 14.2.5
- socket.io-client v. 4.7.5
- Express v. 4.19.2

# Installation
1. Make sure you've got Node v.20. If on macOS, you can use `n` to manage your Node.js versions. See more [here](https://github.com/tj/n). Validate you have an acceptable version of Node with `node -v`
2. Navigate to `/` and run `npm install`
3. Navigate to `/server/` and run `npm install`

# Local deployment
This has only been used in dev mode on localhost. The instructions are to, only, get you up and running locally.

1. Navigate to `/` and run `npm run dev`
2. Navigate to `/server/` and run `node index.js`

Both the React development server and the Node/Express server should be up. You can visit the web app at `http://localhost:3000/`. The broadcasted videos can be found in `/server/`

> Note: To stop broadcasting a tab/ window/ screen/ app click on Chrome's native UI. This functionality doesn't exist as part of our UI.

> Note: I'd recommend to delete every `media.webm` on successive tests. It should be overwritten without issue, but I haven't had the time to test that.


# Tests
Only tested briefly on macOS. No coverage.