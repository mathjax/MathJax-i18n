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
// Hub:Insert and Localization:addTranslation are copied from MathJax.
MathJax = {
  Hub: {
    Insert: function (dst,src) {
      for (var id in src) {if (src.hasOwnProperty(id)) {
        // allow for concatenation of arrays?
        if (typeof src[id] === 'object' && !(src[id] instanceof Array) &&
            (typeof dst[id] === 'object' || typeof dst[id] === 'function')) {
          this.Insert(dst[id],src[id]);
        } else {
          dst[id] = src[id];
        }
      }}
      return dst;
    },
  },
  Localization: {
    strings: {},
    addTranslation: function (locale,domain,definition) {
      var data = this.strings[locale];
      if (!data) {data = this.strings[locale] = {}}
      if (!data.domains) {data.domains = {}}
      if (domain) {
        if (!data.domains[domain]) {data.domains[domain] = {}}
        data = data.domains[domain];
      }
      MathJax.Hub.Insert(data,definition);
    },

    //
    //  The pattern for substitution escapes:
    //      %n or %{n} or %{plural:%n|option1|option1|...} or %c
    //
    pattern: /%(\d+|\{\d+\}|\{[a-z]+:\%\d+(?:\|(?:%\{\d+\}|%.|[^\}])*)+\}|.)/g,

    processString: function (aString) {
      // This is an adaptation of Localization:processString to convert from
      // the MathJax string format to the jquery.i18n format.
      var parts = aString.split(this.pattern);
      for (var i = 1, m = parts.length; i < m; i += 2) {
        var c = parts[i].charAt(0);  // first char will be { or \d or a char to be kept literally
        if (c >= "0" && c <= "9") {    // %n
          parts[i] = parts[i];
          parts[i] = "$" + parts[i];
        } else if (c === "{") {        // %{n} or %{plural:%n|...}
          c = parts[i].substr(1);
          if (c >= "0" && c <= "9") {  // %{n}
            parts[i] = parts[i].substr(1,parts[i].length-2);
            parts[i] = "$" + parts[i];
          } else {                     // %{plural:%n|...}
            var match = parts[i].match(/^\{([a-z]+):%(\d+)\|(.*)\}$/);
            if (match) {
              if (match[1] === "plural") {
                parts[i] = "{{" + match[1] + ":" + "$" + match[2];
                var plurals = match[3].replace(/(^|[^%])(%%)*%\|/g,"$1$2%\uEFEF").split(/\|/); // the parts (replacing %| with a special character)
                for (var n = 0; n < plurals.length; n++) {
                  parts[i] += "|" + this.processString(plurals[n].replace(/\uEFEF/g,"|"));
                }
                parts[i] += "}}";
              } else {parts[i] = "%"+parts[i]}  // not "plural", put back the % and leave unchanged
            }
          }
        }
        if (parts[i] == null) {parts[i] = "???"}
      }

      aString = parts.join("");

      return aString;
    }


  },
  Ajax: {
    loadComplete: function(aFile) {
      console.log("Load Complete: " + aFile);
    },
    Load: function (aFile) {
      var path = gMathJaxPath + "/unpacked/localization/" + aFile + ".js";
      try {
        require(path);
      } catch(e) {
        console.warn("Fail to load " + path)
      }
    }
  }
}

// Load the translation data
for (var i in config.languages) {
  var dir = "./" + config.languages[i] + "/";
  MathJax.Ajax.Load(dir + config.languages[i]);
  for (var j in config.domains) {
    MathJax.Ajax.Load(dir + config.domains[j]);
  }
}

// Generate the JSON data
var fs = require("fs");
for (var language in MathJax.Localization.strings) {

  // Create the language directory if it does not exist
  var dir = "./JSON/" + language + "/";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

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
