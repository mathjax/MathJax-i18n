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

console.error("Not Implemented yet!")
process.exit(1);

// Process the config options and command arguments
var config = require("./config.js");
if (process.argv.length != 3) {
  console.log("usage: nodejs toMathJax.js MATHJAXPATH");
  process.exit(1);
}
var gMathJaxPath = process.argv[2];

// Fake MathJax variable to simulate features used by the localization files.
MathJax = {};
require("./MathJax.js");
MathJax.Localization.loadAll(config.languages, config.domains, gMathJaxPath)

// Merge the data from config.js into MathJax.Localization
MathJax.Hub.Insert(MathJax.Localization.strings, config.languages)

// Convert the JSON data to MathJax format and merge into MathJax.Localization
function convertToMathJaxFormat(aData)
{
  for (var id in aData) {
    var s = aData[id];
    s = s.replace(/%/g, "%%"); // escape percent sign
    aData[id] = s;
  }
  return aData;
}

for (var lang in config.languages) {
  if (config.languages[lang].remap) continue; // skip remapped languages

  if (!MathJax.Localization.strings.hasOwnProperty(lang)) {
    console.error("The data for language '" + lang + "' does not exist." +
                  "Please verify that you have added it to config.js");
    process.exit(1);
  }

  var dir = "./JSON/" + lang + "/";
  var domains = MathJax.Localization.strings[lang].domains;

  // Main domain _
  var strings = convertToMathJaxFormat(require(dir + lang + ".json"));
  MathJax.Hub.Insert(domains["_"], strings);

  // Subdomains
  for (var i in config.domains) {
    var d = config.domains[i];
    var strings = convertToMathJaxFormat(require(dir + d + ".json"));
    MathJax.Hub.Insert(domains[d], strings);
  }
}

// Serialize and escape...

console.log(MathJax.Localization.strings['fr'])
