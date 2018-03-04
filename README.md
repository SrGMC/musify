
# Musify
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Musify is a simple and fast music player, built from the ground up, using web technologies such as HTML, CSS and JavaScript, all wrapped on Electron Framework.
This is my first project as a computer science student. I've tried my best to write a code that follows common coding conventions, but keep in mind that you may find spaghetti code, poorly documented code or common beginner errors. If so, feel free to help and contribute to improve this app.

## Table of Contents

 - [Releases](#releases)
 - [Development](#development)
 - [Contributing](#contributing)
 - [Versioning](#versioning)
 - [Changelog](#changelog)
 - [Acknowledgements](#acknowledgements)

## [Releases](https://github.com/SrGMC/musify/releases)
- macOS: Version 0.8.2 - 110MB / .zip file
	![Download](https://github.com/SrGMC/musify/releases/download/0.8.2/Musify.zip)

You can see the latest changes [here](#changelog).

## Development
This app is built using Electron. It requires the following dependencies:

```bash
    dialogs >=1.1.20
    electron >=1.7.11
    electron-builder >=19.55.3
    musicmetadata: >=2.0.5
    photonkit: >=0.1.2
    snazzy: >=7.0.0
    about-window: >= 1.10.0
```

To start developing, run the following commands (you'll need [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) already installed in your system):

```bash
    git clone https://github.com/SrGMC/musify.git
    cd musify
    npm install standard -g
    npm run-script postinstall
 ```

To run the app, simply run:

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

## Contributing
If you want to contribute, please follow this guidelines:
### Feedback
Always follow this structure when reporting a new bug or suggesting a new feature:

 1. Type: bug, feature or suggestion
 2. OS: Windows, macOS or linux
 3. OS version:
 4. App version:
 5. When did the bug happen?
 6. What did you try when the bug happened?
 7. Description/More information:

You can ommit 5. and 6. if you are making a suggestion or proposing a feature.

### Code
JavaScript code follows the JavaScript Standard Code Style. You can check it out [here](https://github.com/standard/standard). Also, you can run `npm run-script fix` (assuming you have standard and snazzy installed) to check for js errors and coding style.

CSS follows this style:

 1. Use two spaces to indent each property. Never tabs or a mix of tabs and spaces
 2. Each selector should be on its own line, ending in either a comma or an opening curly brace. 
 3. Use human readable selectors that describe what element(s) they style. Avoid using camelcase and underscores
 4. Attribute selectors should use double quotes around values
 5. Refrain from using over-qualified selectors, `div.container` can simply be stated as `.container`
 6. Use hex code for colors, or `rgba()` if opacity is needed. Always use complete lowercase hex color codes (`#ffffff`) instead of shortened ones (`#FFF`).
 7. Order the properties alphabetically and in blocks:
	    - Positioning
	    - Display
	    - Box model
	    - Other
 8. `z-index` always goes inmmediately bellow position. Position atributtes follow this order: Top/Right/Bottom/Left
 9. Space before the value but not before the semicolon. Also, always end with a semicolon.
 10. Use double quotes rather than single quotes.
 11. Font weights should be defined using numeric values (e.g. 400 instead of normal, 700 rather than bold).
 12. 0 values should not have units unless necessary.
 
 This rules have been extracted from [here](https://github.com/necolas/idiomatic-css).

## Versioning
Musify is maintained under the Semantic Versioning guidelines.

Releases will be numbered with the following format:

> [major].[minor].[patch]

And constructed with the following guidelines:

 - Breaking backward compatibility bumps the **major** while **resetting minor
   and patch**.
 - New additions without breaking backward compatibility bumps the **minor**
   while **resetting the patch**.
 - Bug fixes and misc changes bumps only the **patch**.

For more information on SemVer, please visit [http://semver.org/](http://semver.org/).

## Changelog
All the releases can be found [here](https://github.com/SrGMC/musify/releases).

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
