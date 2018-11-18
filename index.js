#!/usr/bin/env node
'use strict';

console.log('Code Jam starter files initializing...');

import fs from 'fs';
import mkdirp from 'mkdirp';
import { argv } from 'yargs';
import rimraf from 'rimraf';

// Handle command line paramters
const TYPE = 'type';
const ROUND = 'round';
const YEAR = 'year';
const getParameterMessage = (name) => (
  `Please specify ${name} with '--${name} <${name}>'`
);
if (!argv.type) {
  console.log(getParameterMessage(TYPE));
  process.exit();
}
if (!argv.round) {
  console.log(getParameterMessage(ROUND));
  process.exit();
}
if (!argv.year) {
  console.log(getParameterMessage(YEAR));
  process.exit();
}

// Create directories
const newDirectoryName = `code-jam-${argv.type}-${argv.round}-${argv.year}`;

function createFolders() {
  const numberOfFolders = argv.num || 3;
  let failure = false;
  for (let i = 1; i <= numberOfFolders; i++) {
    const subFolderPath = `${process.cwd()}/${newDirectoryName}/problem_${i}`;
    mkdirp(subFolderPath, function subFolderCB(err) {
      if (err) {
        handleError(newDirectoryName, `Error creating folder ${subFolderPath}`);
      } else {
        const textPath = `${__dirname}/solution.txt`;
        fs.readFile(textPath, function(err, text) {
          if (err) {
            handleError(newDirectoryName, `Error reading ${textPath}: ${err}`)
          }
          fs.writeFile(`${subFolderPath}/solution.js`, text, function(err) {
            if (err) {
              handleError(newDirectoryName, `Error creating files: ${err}`);
            }
          });
        });
      }
    })
  }
}

function handleError(directoryName, message) {
  console.log(message);
  rimraf(directoryName, (err) => {
    const errorMessage = 'Trouble creating folders - mission aborted.';
    if (err) {
      throw new Error(`${errorMessage} Please delete any generated files and try again.`);
    } else {
      throw new Error(errorMessage);
    }
  });
}

createFolders();
