# CAP-SU-late
![Lint workflow badge](https://github.com/SuibianP/CAP-SU-late/workflows/Lint%20JavaScript%20with%20ESLint/badge.svg) ![Contribution friendliness badge](https://img.shields.io/badge/issues%2FPRs-welcome!-brightgreen) ![License badge](https://img.shields.io/github/license/SuibianP/CAP-SU-late)


This is a browser script (or extension, in a broader sense) to simplify the calculation of CAP when considering S/U declaration. More specifically, it enables users to toggle S/U options and see the post-S/U CAP instantly on the same page. It mainly targets NUS undergraduates, while other systems based on [Oracle PeopleSoft](https://www.oracle.com/applications/peoplesoft/) may also work.

## Usage
The following two methods are identical, except that the first has to be done again after the browser tab is closed.
### Use as a script
Just copy [all the contents of the js file](https://raw.githubusercontent.com/SuibianP/CAP-SU-late/main/cap.js), paste into [the browser console](https://balsamiq.com/support/faqs/browserconsole/), and press <kbd>Enter</kbd>.

### Use as an extension package
It actually depends on the browser. In many cases, just download the zipped source and install unpacked extension. (Most browsers have at least some developer mode for that.) ~~I really cannot be bothered to package and maintain for all the different browsers~~

## Availability
It is tested with Firefox 84.0 under Ubuntu 18.04. Theoretically, it should also be working in browsers that basically conforms to [the API for browser extensions](https://en.wikipedia.org/wiki/Browser_extension#API_conformity), including Google Chrome, Mozilla Firefox, Microsoft Edge, etc.

## Bug report, feature request, other contributions, etc.
Feel free to [open an issue](https://github.com/SuibianP/CAP-SU-late/issues/new)!

Note that this project conforms to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with the exception of [mutating property of function parameter](https://eslint.org/docs/rules/no-param-reassign.html#props).
