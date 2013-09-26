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

MathJax.Hub = {
  Insert: function (dst,src) {
    // This is copied from MathJax.
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

  EscapeNonAscii: function (aString, aToUpper) {
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
      if (n > 0x7F || n === 0x26 || n === 0x3C || n === 0x3E) {
        // escape non-ASCII characters, '<', '>' and '&'
        string[i] = n.toString(16);
        if (aToUpper || n <= 0x7F) string[i] = string[i].toUpperCase();
        while (string[i].length < 4) string[i] = "0" + string[i];
        string[i] = "\\u" + string[i];
      }
    }

    return string.join("");
  }
}

MathJax.Localization = {
  strings: {},

  loadAll: function(aLanguages, aDomains, aMathJaxPath) {
    // Load the translation data
    for (var lang in aLanguages) {
      if (aLanguages[lang].remap) continue; // skip remapped languages
      var dir = aMathJaxPath + "/unpacked/localization/" + lang + "/";

      // Main domain _
      MathJax.Ajax.Load(dir + lang + ".js");

      // Subdomains
      for (var i in aDomains) {
        MathJax.Ajax.Load(dir + aDomains[i] + ".js");
      }
    }
  },

  addTranslation: function (locale,domain,definition) {
    // This is copied from MathJax.
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

    // fredw: There does not seem to be any spec that clearly describes the
    // jquery.i18n syntax. Let's try to guess...

    for (var i = 1, m = parts.length; i < m; i += 2) {
      var c = parts[i].charAt(0);  // first char will be { or \d or a char to be kept literally
      if (c >= "0" && c <= "9") {    // %n
        parts[i] = parts[i];
        parts[i] = "$" + parts[i];
      } else if (c === "{") {        // %{n} or %{plural:%n|...}
        c = parts[i].substr(1);
        if (c >= "0" && c <= "9") {  // %{n}
          // fredw: what's WikiMedia syntax for that?
          console.warn("possible loss of information when converting %{"+c+"}")
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
}

MathJax.Ajax = {
  loadComplete: function(aFile) {
    console.log("Load Complete: " + aFile);
  },
  Load: function (aFile) {
    try {
      require(aFile);
    } catch(e) {
      console.warn("Fail to load " + aFile)
    }
  }
}
