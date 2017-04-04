import { readFile, writeFile } from 'fs';
import { resolve } from 'path';
import StripWhitespace from './index';
// tslint:disable:no-var-requires
const config = require('./package.json');
// tslint:enable:no-var-require
declare type Process = typeof process;

interface CLIOptions {
  input?: string;
  output?: string;
  showHelp?: boolean;
}

process.title = config.name;

const options = parseArguments(process);
processFiles(options);

function processFiles(opt: CLIOptions) {
  if (opt.input && opt.output) {
    readFile(opt.input, 'utf-8', (err, code) => {
      if (err || !opt.output) {
        console.error(err);
      } else {
        const stripWhitespace = new StripWhitespace();
        const cleanCode = stripWhitespace.strip(code).code;
        writeFile(opt.output, cleanCode, handleError);
      }
    });
  } else {
    printHelp();
  }
}

function handleError(err: NodeJS.ErrnoException) {
  if (err) {
    console.error(err);
  }
}

function printHelp() {
  process.stdout.write(
    config.name + ' ' + config.version + '\n' +
    '\n' +
    'Usage: strip-whitespace --input <file> --output <file>'
  );
}

function parseArguments(process: Process): CLIOptions {
  const parsedOptions: CLIOptions = {};
  process.argv.forEach((val, idx) => {
    switch (val) {
      case '--input':
      case '-i':
        const inputFile = process.argv[idx + 1];
        parsedOptions.input = resolve(inputFile);
        break;
      case '--output':
      case '-o':
        const outputFile = process.argv[idx + 1];
        parsedOptions.output = resolve(outputFile);
        break;
      default:
        break;
    }
  });
  return parsedOptions;
}
