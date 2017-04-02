import { ok } from 'assert';
import StripWhitespace from '../src/index';

const stringCleaner = new StripWhitespace();

{
  const code = `const longString = '      x          ';`;
  const result = stringCleaner.strip(code);
  ok(result.code.indexOf(`' x '`) > -1, `it did not strip whitespace.  Result: ${result.code}`);
}

{
  const code = `
    !function() {
      if (true) {
        const longString = '      x          ';
        if (false) {
          const longString = '      x          ';
        } else {
          const longString = '      x          ';
        }
      }
    }
  `;
  const result = stringCleaner.strip(code);
  ok(result.code.indexOf(`' x '`) > -1, `it did not strip whitespace.  Result: ${result.code}`);
}

{
  const code = `
    !function() {
      "use strict";

      if (true) {
        const longString = '      x          ';
      }
    }
  `;
  const result = stringCleaner.strip(code);

  ok(result.code.indexOf(`' x '`) > -1, `it did not strip whitespace.  Result: ${result.code}`);
  ok(result.code.indexOf(`"use strict"`) > -1, 'it messed up the "use strict" string.');
  ok(result.replacements.length === 1, 'it treated the "use strict" string as a replacement');
}

{
  const code = `const longString = '      "x"          ';`;
  const result = stringCleaner.strip(code);

  ok(result.code.indexOf(` = ' \"x\" '`) > -1, `it did not handle escaping quotes.  Result: ${result.code}`);
}

{
  const code = `"\\n  x "`;

  const result = stringCleaner.strip(code);
  ok(result.code.indexOf(`" x "`) > -1, `it did not handle escaping new lines.  Result: ${result.code}`);
}

{
  const code = `var y = { "do not strip  ": "should be stripped      " }`;

  const result = stringCleaner.strip(code);
  ok(result.code.indexOf(`var y = { "do not strip  ": "should be stripped " }`) > -1, `it did object keys.  Result: ${result.code}`);
}

{
  // create string cleaner that won't clean any strings, because you know...testing
  const badStringCleaner = new StripWhitespace({
    shouldStripWhitespace: () => false
  });
  const code = `'   x   '`;
  const result = badStringCleaner.strip(code);
  ok(result.code.indexOf(`'   x   '`) > -1, `it did not override shouldStripWhitespace.  Result: ${result.code}`);
}

// if we arrived here, then the tests passed
console.log('All tests passed!  Woohoo!')
