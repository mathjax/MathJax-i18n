/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */
/*
 *  Copyright (c) 2013 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

// Process the config options and command arguments
var config = require("./config.js");
if (process.argv.length != 3) {
  console.log("usage: nodejs toJSON.js MATHJAXPATH");
  process.exit(1);
}
var gMathJaxPath = process.argv[2];

// Fake MathJax variable to simulate features used by the localization files.
MathJax = {};
require("./MathJax.js");
MathJax.Localization.loadAll(config.languages, config.domains, gMathJaxPath)

// Generate the JSON data
var fs = require("fs");

// Create the JSON directory if it does not exist
var dir = "./JSON/";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

for (var language in MathJax.Localization.strings) {

  // Create the language directory if it does not exist
  var dir = "./JSON/" + language + "/";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // Create files for each domain
  var domains = MathJax.Localization.strings[language].domains;
  for (var d in domains) {

    var file = dir + (d === "_" ? language : d) + ".json";

    // Convert the string to WikiMedia format
    var strings = domains[d].strings;
    for (var id in strings) {
      var s = MathJax.Localization.processString(strings[id]);
      strings[id] = s.replace(/\n/g, "\\n"); // escape new lines

      // fredw: TODO escape jquery.i18n syntax e.g. $ signs
    };

    // If the JSON file already exists, merge the MathJax strings into it.
    if (fs.existsSync(file)) {
      var mathjaxStrings = strings;
      strings = require(file);
      MathJax.Hub.Insert(strings, mathjaxStrings);
    }

    // Write the JSON object for that domain
    var fd = fs.openSync(file, "w");
    console.log("Creating " + file)

    fs.writeSync(fd, "{\n");
    var first = true;
    for (var id in strings) {
      if (!first) { fs.writeSync(fd, ',\n'); }
      fs.writeSync(fd, '  "' + id + '": ');

      var s = strings[id];
      s = s.replace(/\\/g, "\\\\"); // escape the backslash

      fs.writeSync(fd, '"' + s + '"');
      first = false;
    }
    fs.writeSync(fd, "\n}");
    fs.closeSync(fd);
  }
}
