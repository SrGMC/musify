#How to contribute to the project
##Code
###JavaScript
JavaScript code follows the JavaScript Standard Code Style. You can check it out [here](https://github.com/standard/standard). Also, you can run `npm run-script fix` (assuming you have standard and snazzy installed) to check for js errors and coding style.

###CSS
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