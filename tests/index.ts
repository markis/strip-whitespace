import { ok } from 'assert';
import StripWhitespace from '../src/index';

const stringCleaner = new StripWhitespace();

{
  const code = `const longString = '      x          ';`;
  const result = stringCleaner.strip(code);
  ok(result.code.indexOf(`' x '`) > -1, 'it did not strip whitespace');
}

{
  const code = `
    !function() {
      if (true) {
        const longString = '      x          ';
      }
    }
  `;
  const result = stringCleaner.strip(code);
  ok(result.code.indexOf(`' x '`) > -1, 'it did not strip whitespace');
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

  ok(result.code.indexOf(`' x '`) > -1, 'it did not strip whitespace');
  ok(result.code.indexOf(`"use strict"`) > -1, 'it messed up the "use strict" string');
  ok(result.replacements.length === 1, 'it treated the "use strict" string as a replacement');
}
