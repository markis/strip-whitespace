# Strip-Whitespace - a javascript string minifier

[![Build Status](https://travis-ci.org/markis/strip-whitespace.svg?branch=master)](https://travis-ci.org/markis/strip-whitespace) [![Known Vulnerabilities](https://snyk.io/test/github/markis/strip-whitespace/badge.svg)](https://snyk.io/test/github/markis/strip-whitespace) [![Greenkeeper badge](https://badges.greenkeeper.io/markis/strip-whitespace.svg)](https://greenkeeper.io/)

Strip-Whitespace will remove extraneous spaces from strings. It's perfect for working with rendering templates (ex. mustache, handlebars) or es6 javascript templates. It works with anything where you might create very long strings.

##### Before strip-whitespace:
``` javascript
function() {
  if (condition) {
    const longString = '  String   with    some    extra   spaces  ';
  }
}
```

##### After strip-whitespace:
``` javascript
function() {
  if (condition) {
    const longString = ' String with some extra spaces ';
  }
}
```

##### Command-line usage
``` shell
$ strip-whitespace --input <input-file> --output <output-file>
```

##### Javascript usage
``` javascript
var StripWhitespace = require('strip-whitespace');

// options are optional and can be omitted
var stripWhitespace = new StripWhitespace(options);
var result = stripWhitespace.strip(code);

// do things with the code
code = result.code;
```

##### Options

All options are optional

``` javascript
{
  shouldStripWhitespace: function(fatString) {
    // following code will answer the question: should this string be stripped of whitespace?
    if (fatString.startsWith('DO NOT MODIFY THIS STRING')) {
      return false;
    }

    return true;
  }
}
```
