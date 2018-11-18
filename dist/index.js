#!/usr/bin/env node

'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _yargs = require('yargs');

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Code Jam Initializer');

// Handle command line paramters
var TYPE = 'type';
var ROUND = 'round';
var YEAR = 'year';
var getParameterMessage = function getParameterMessage(name) {
  return 'Please specify ' + name + ' with \'--' + name + ' <' + name + '>\'';
};
if (!_yargs.argv.type) {
  console.log(getParameterMessage(TYPE));
  process.exit();
}
if (!_yargs.argv.round) {
  console.log(getParameterMessage(ROUND));
  process.exit();
}
if (!_yargs.argv.year) {
  console.log(getParameterMessage(YEAR));
  process.exit();
}

// Create directories
var newDirectoryName = 'code-jam-' + _yargs.argv.type + '-' + _yargs.argv.round + '-' + _yargs.argv.year;

function createFolders() {
  var numberOfFolders = _yargs.argv.num || 3;
  var failure = false;

  var _loop = function _loop(i) {
    var subFolderPath = process.cwd() + '/' + newDirectoryName + '/problem_' + i;
    (0, _mkdirp2.default)(subFolderPath, function subFolderCB(err) {
      if (err) {
        handleError(newDirectoryName, 'Error creating folder ' + subFolderPath);
      } else {
        var textPath = __dirname + '/solution.txt';
        _fs2.default.readFile(textPath, function (err, text) {
          if (err) {
            handleError(newDirectoryName, 'Error reading ' + textPath + ': ' + err);
          }
          _fs2.default.writeFile(subFolderPath + '/solution.js', text, function (err) {
            if (err) {
              handleError(newDirectoryName, 'Error creating files: ' + err);
            }
          });
        });
      }
    });
  };

  for (var i = 1; i <= numberOfFolders; i++) {
    _loop(i);
  }
}

function handleError(directoryName, message) {
  console.log(message);
  (0, _rimraf2.default)(directoryName, function (err) {
    var errorMessage = 'Trouble creating folders - mission aborted.';
    if (err) {
      throw new Error(errorMessage + ' Please delete any generated files and try again.');
    } else {
      throw new Error(errorMessage);
    }
  });
}

createFolders();