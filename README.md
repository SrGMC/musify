**Notice**: Due to studies and other reasons, I'm currently unable to continue developing the project, however, new pull requests are welcome and I'll pick it up when my time allows.

# Musify
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Musify is a simple and fast music player, built from the ground up, using web technologies such as HTML, CSS and JavaScript, all wrapped on Electron Framework.
This is my first project as a computer science student. I've tried my best to write a code that follows common coding conventions, but keep in mind that you may find common beginner errors. If so, feel free to help and contribute to improve this app.

### Development is now in the [dev branch](https://github.com/SrGMC/musify/tree/dev)

## Table of Contents

 - [Releases](#releases)
 - [Development](#development)
 - [TODO](#todo)
 - [Contributing](#contributing)
 - [Changelog](#changelog)
 - [Acknowledgements](#acknowledgements)

## [Releases](https://github.com/SrGMC/musify/releases)
- macOS: Version 0.8.3 - 62.9MB / .zip file [Download](https://github.com/SrGMC/musify/releases/download/0.8.3/Musify.zip)

You can see the latest changes [here](#changelog).

## Development
This app is built using Electron. It requires the following dependencies:

```bash
    dialogs
    electron
    electron-builder
    musicmetadata
    photonkit
    snazzy
    about-window
```

To start developing, run the following commands (you'll need [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) already installed in your system):

```bash
    git clone https://github.com/SrGMC/musify.git
    cd musify
    npm run-script postinstall
```

To run the app, simply execute:

```bash
    npm start
```

To fix js files, simply run:

```bash
    npm run-script fix
```

To build binary files, simply run one of the following:

```bash
    npm run-script package-mac
    npm run-script package-windows
    npm run-script package-linux
```

## TODO
- [ ] Shuffle songs (WIP in [dev branch](https://github.com/SrGMC/musify/tree/dev))
- [ ] Loop only one song (WIP in [dev branch](https://github.com/SrGMC/musify/tree/dev))
- [x] Start song again when previous song button is pressed
- [ ] Prevent adding an already added song
- [ ] Code cleanup

## Contributing
If you want to contribute, please follow this guidelines:
### Feedback
Please fill and follow the following structure when opening issues
*Sections in **bold** are required*

1. **Type**:
2. **OS**:
3. **OS version**:
4. **App version**:
5. When did the bug happen?:
6. What did you try when the bug happened?:
7. Description/More information:

### Code
Check out the [CONTRIBUTING.md file](https://github.com/SrGMC/musify/blob/master/CONTRIBUTING.md)

## Changelog
All the releases can be found [here](https://github.com/SrGMC/musify/releases).

### beta 0.8.3:
* Security updates

### beta 0.8.2:
* Fixed footer bar that hid the last items on the playlist
* New logo by [@moenawar](https://github.com/moenawar85) [#1](https://github.com/SrGMC/musify/issues/1)
* Added new about window

### beta 0.8.1:
* Fixes a problem where songs removed could still be played
* Adds a clear button
* Songs are now parsed on addition, not on-the-fly
* Fixes a problem that notified continuously a song change when the playlist ended

## License
Copyright @SrGMC. Released under GPL-3.0.

## Acknowledgements
- Creator: [@SrGMC](https://github.com/SrGMC)
     + [Twitter](https://twitter.com/Sr_GMC)
- Logo: [@moenawar](https://github.com/moenawar85)
     + [Steemit contribution](https://steemit.com/utopian-io/@moenawar/my-new-logo-design-for-musify)
     + [Twitter](https://twitter.com/moen85)
