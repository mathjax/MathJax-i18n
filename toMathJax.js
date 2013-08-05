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

function processString(aString)
{
  // fredw: There does not seem to be any spec that clearly describes the
  // jquery.i18n syntax. Let's try to guess...

  aString = aString.replace(/%/g, "%%"); // escape percent sign
  aString = aString.replace(/\$(\d+)/g, "%$1"); // convert $n => %n
  aString = aString.replace(/\{\{plural:((?:[^\}]|\}[^\}])+)\}\}/gi,
                            "%{plural:$1}")

  return aString;
}

function convertToMathJaxFormat(aData)
{
  if (aData.hasOwnProperty("@metadata")) {
    // Delete TranslateWiki's metadata.
    // fredw: should we import that to our metadata?
    delete aData["@metadata"];
  }
    
  for (var id in aData) {
    aData[id] = processString(aData[id]);
  }
  return aData;
}

function escapeNonAscii(aString)
{
  var string = String(aString).split("");
  for (var i = 0, m = string.length; i < m; i++) {

    if (string[i] === '\"' ||
        string[i] === '\\') {
      // escape quote and backslash
      string[i] = '\\' + string[i];
      continue;
    }
    if (string[i] === '\n') {
      // escape new line
      string[i] = '\\n';
      continue;
    }
    var n = string[i].charCodeAt(0);
    if (n > 0x7F) {
      // escape the character
      string[i] = n.toString(16).toUpperCase();
      while (string[i].length < 4) string[i] = "0" + string[i];
      string[i] = "\\u" + string[i];
    }
  }

  return string.join("");
}


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

for (var lang in config.languages) {
  if (config.languages[lang].remap) continue; // skip remapped languages

  if (!MathJax.Localization.strings.hasOwnProperty(lang)) {
    console.error("The data for language '" + lang + "' does not exist." +
                  "Please verify that you have added it to config.js");
    process.exit(1);
  }

  var dir = "./JSON/" + lang + "/";
  var domains = MathJax.Localization.strings[lang].domains;

  if (!domains) {
    // The language does not exist yet in MathJax data.
    MathJax.Localization.strings[lang].domains = {};
    domains = MathJax.Localization.strings[lang].domains;
    domains["_"] = { strings: {} }
    for (var i in config.domains) {
      var d = config.domains[i];
      domains[d] = { strings: {} }
    }
  }

  // Main domain _
  var strings = convertToMathJaxFormat(require(dir + lang + ".json"));
  MathJax.Hub.Insert(domains["_"].strings, strings);

  // Subdomains
  for (var i in config.domains) {
    var d = config.domains[i];
    var strings = convertToMathJaxFormat(require(dir + d + ".json"));
    MathJax.Hub.Insert(domains[d].strings, strings);
  }
}

var fs = require("fs");
var template = fs.readFileSync("template-unpacked.js", "utf8");

// Clean up language directories
var dir = gMathJaxPath + "/unpacked/localization/";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);
for (var lang in config.languages) {
  var d = dir + lang + "/";
  if (!fs.existsSync(d)) {
    // create a new directory
    fs.mkdirSync(d);
  } else {
    // empty the directory
    var files = fs.readdirSync(d);
    for (var i in files) fs.unlinkSync(d + files[i]);
  }
}

// Now serialize the localization data
for (var lang in config.languages) {
  if (config.languages[lang].remap) continue; // skip remapped languages

  var langData = MathJax.Localization.strings[lang];

  // Create files for each domain
  var domains = langData.domains;
  for (var d in domains) {
    var file = lang + "/" + (d === "_" ? lang : d) + ".js";

    var fd = fs.openSync(dir + "/" + file, "w");
    console.log("Creating " + file)

    // Write the header
    fs.writeSync(fd, template.replace("%%%NAME%%%", file));

    fs.writeSync(fd, 'MathJax.Localization.addTranslation("' + lang + '",' +
                 (d === "_" ? "null" : '"'+d+'"') + ',{\n');

    if (d === "_") {
      fs.writeSync(fd, '  menuTitle: "' +
                   escapeNonAscii(langData.menuTitle) + '",\n');
      fs.writeSync(fd, '  version: "' + config.version + '",\n');
      fs.writeSync(fd, '  isLoaded: true,\n');
      fs.writeSync(fd, '  domains: {\n');
      fs.writeSync(fd, '    "_": {\n');
    }

    fs.writeSync(fd, '        version: "' + config.version + '",\n');
    fs.writeSync(fd, '        isLoaded: true,\n');
    fs.writeSync(fd, '        strings: {\n');

    var first = true;
    for (var id in domains[d].strings) {
      if (!first) { fs.writeSync(fd, ',\n'); }
      fs.writeSync(fd, '          ' + id + ': ');
      fs.writeSync(fd, '"' + escapeNonAscii(domains[d].strings[id]) + '"');
      first = false;
    }
    fs.writeSync(fd, '\n        }\n');

    if (d === "_") {
      fs.writeSync(fd, '    },\n');
      var first = true;
      for (var id in domains) {
        if (id === "_") continue;
        if (!first) { fs.writeSync(fd, ',\n'); }
        fs.writeSync(fd, '    "' + id + '": {}');
        first = false;
      }
      fs.writeSync(fd, '\n  },\n');
      
      fs.writeSync(fd, '  plural: '+langData.plural+',\n');
      fs.writeSync(fd, '  number: '+langData.number+'\n');
    }

    fs.writeSync(fd, '});\n\n');
    fs.writeSync(fd, 'MathJax.Ajax.loadComplete("[MathJax]/localization/'+
                 file + '");\n');

    fs.closeSync(fd);
  }
}
