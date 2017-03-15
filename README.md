# Strip-Whitespace - a javascript string minifier

[![Build Status](https://travis-ci.org/markis/strip-whitespace.svg?branch=master)](https://travis-ci.org/markis/strip-whitespace) [![Greenkeeper badge](https://badges.greenkeeper.io/markis/strip-whitespace.svg)](https://greenkeeper.io/)

Before strip-whitespace:
```
function() {
  if (condition) {
    const longString = '      x          ';
  }
}
```

After strip-whitespace:
```
function() {
  if (condition) {
    const longString = ' x ';
  }
}
```

##### Command-line usage
```
strip-whitespace

Usage: strip-whitespace --input <file> --output <file>
```
