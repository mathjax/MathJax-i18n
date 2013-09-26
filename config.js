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

exports.version = "2.3"

// ********** List of languages **********
//
// - Use correct ISO-639-1 two letter code
//   http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes if available.
//   If you are specifying in more detail (e.g. a specific dialect), you can use
//   a IETF language tag: https://en.wikipedia.org/wiki/IETF_language_tag
//
// - "menuTitle" is the language name that will appear in the MathJax submenu
//   for switching locales.
//
// - "fontDirection" is an optional the CSS direction ("ltr", "rtl")
//
// - "fontFamily" is an optional CSS font family.
//
// - Use "remap" to specify language fallback e.g.
//
//   "pt": {
//     menuTitle: "portugusê",
//     remap: "pt-br"
//   }
//
//   will use the "pt-br" localization data when the user selects "pt".
//
// - "plural" is a Javascript function that maps a number n to the
//   CLDR mnemonic tags for these plural categories. For example in Macedonian,
//   it should be
//
//   number: function(n) {
//     if (n % 10 === 1 && n !== 11) {return 1} // one: 1, 21, 31, 41, 51, 61
//     return 2; // other: 0, 2-20, 22-30, 32-40...; 1.2, 2.07...
//   }
//
//   See http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
//
// - "number" is a Javascript function that allows to localize a number n. It
//   should return a value that can be converted to string. For example, some
//   countries use a decimal comma rather than a  decimal point:
//
//   number: function(n) {
//     return String(n).replace(".", ","); // replace dot by comma
//   }

exports.languages = {
  "br": {
    menuTitle: "Breton",
    plural: function(n) {
      if (n % 10 === 1 && !(n % 100 === 11 || n % 100 === 71 ||
                            n % 100 === 91)) {return 1} // one
      if (n % 10 === 2 && !(n % 100 === 12 || n % 100 === 72 ||
                            n % 100 === 92)) {return 2} // two
      if ((n % 10 === 3 || n % 10 === 4 || n % 10 === 9) &&
          !(10 <= n % 100 && n % 100 <= 19 ||
            70 <= n % 100 && n % 100 <= 79 ||
            90 <= n % 100 && n % 100 <= 99)) {return 3} // few
      if (n !== 0 && n % 1000000 === 0) {return 4} // other
      return 5;
    },
    number: function(n) {
      return n;
    }
  },
  "de": {
    menuTitle: "Deutsch",
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "en": {
    menuTitle: "English",
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "fi": {
    menuTitle: "Finnish",
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "fr": {
    menuTitle: "Français",
    plural: function(n) {
      if (0 <= n && n < 2) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "he": {
    menuTitle: "Hebrew",
    fontDirection: "rtl",
    plural: function(n) {
      if (n === 1) {return 1} // one
      if (n === 2) {return 2} // two
      if (n !== 0 && n % 10 !== 0) {return 3} // many
      return 4; // other
    },
    number: function(n) {
      return n;
    }
  },
  "ia": {
    menuTitle: "Interlingua",
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "it": {
    menuTitle: "Italiano",
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "ja": {
    menuTitle: "Japanese",
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  },
  "lb": {
    menuTitle: "Luxembourgish",
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "mk": {
    menuTitle: "Macedonian",
    plural: function(n) {
      if (n % 10 === 1 && n !== 11) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "pl": {
    menuTitle: "Polski",
    plural: function(n) {
      if (n == 1) {
        return 0;
      } else if (n % 10 >=2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 1;
      } else {
        return 2;
      }
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "pt": {
    menuTitle: "portugusê",
    remap: "pt-br"
  },
  "pt-br": {
    menuTitle: "português do Brasil",
    plural: function (n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function (n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "qqq": {
    menuTitle: "Message Documentation",
    plural: function (n) {return 1},
    number: function (n) {return n}
  },
  "sv": {
    menuTitle: "Swedish",
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "uk": {
    menuTitle: "Ukrainian",
    plural: function(n) {
      if (n % 10 === 1 && n % 100 != 11) return 1; // one
      if (2 <= n % 10 && n % 10 <= 4 && !(12 <= n % 100 && n % 100 <= 14)) return 2; // few
      if (n % 10 === 0 || (5 <= n % 10 && n % 10 <= 9) || (11 <= n % 100 && n % 100 <= 14)) return 3; // many
      return 4; // other
    },
    number: function(n) {
      return n;
    }
  },
  "zh-hans": {
    menuTitle: "Simplified Chinese",
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  }
};

// ********** List of localization domains **********
exports.domains = [
  "FontWarnings",
  "HTML-CSS",
  "HelpDialog",
  "MathML",
  "MathMenu",
  "TeX"
];
