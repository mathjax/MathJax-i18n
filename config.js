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

exports.version = "2.5.0"

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
//   See http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html and https://github.com/wikimedia/jquery.uls/blob/master/data/langdb.yaml
//
// - "number" is a Javascript function that allows to localize a number n. It
//   should return a value that can be converted to string. For example, some
//   countries use a decimal comma rather than a  decimal point:
//
//   number: function(n) {
//     return String(n).replace(".", ","); // replace dot by comma
//   }

exports.languages = {
  // "af": {
  //   menuTitle: "Afrikaans",
  //   plural: function(n) {
  //     if (n === 1) return 1; // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  // "ak": {
  //   menuTitle: "Akan",
  //   plural: function(n) {
  //     if (0 <= n && n <= 1) return 1; // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  // "am": {
  //   menuTitle: "አማርኛ", // Amharic
  //   plural: function(n) {
  //     if (0 <= n && n <= 1) return 1; // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  // "ar": {
  //   menuTitle: "العربية", // Arabic
  //   fontDirection: "rtl",
  //   plural: function(n) {
  //     if (n === 0) return 1; // zero
  //     if (n === 1) return 2; // one
  //     if (n === 2) return 3; // two
  //     if (3 <= n % 100 && n % 100 <= 10) return 4; // few
  //     if (11 <= n % 100 && n % 100 <= 99) return 5; // many
  //     return 6; // other
  //   },
  //   number: function(n) {
  //     return String(n).replace("/([0-9])/g", "\\U066$1").replace(".", "\\U066B");
  //   }
  // },
  "ast": {
    menuTitle: "asturianu", // Asturian
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  // "asa": {
  //   menuTitle: "asu",
  //   plural: function(n) {
  //     if (n === 1) {return 1} // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  // "az": {
  //   menuTitle: "azərbaycanca",
  //   plural: function(n) {
  //     return 1; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  "bcc": {
    fontDirection: "rtl",
    menuTitle: "بلوچی", //Balochi language
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  },
  "bg": {
    menuTitle: " български", // Bulgarian
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    }
  },
  // "bm": {
  //   menuTitle: "bamanankan",
  //   plural: function(n) {
  //     return 1; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  // "bn": {
  //   menuTitle: "বাংলা", //Bengali
  //   plural: function(n) {
  //     return 1; // other // needs check
  //   },
  //   number: function(n) {
  //     return n; // needs check
  //   }
  // },
  "br": {
    menuTitle: "brezhoneg", // Bretonese
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
  "ca": {
    menuTitle: "català", // Catalan
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "cdo": { //
    menuTitle: "Mìng-dĕ̤ng-ngṳ̄", // Min Dong Chinese
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  },
  "ce": {
    menuTitle: "Нохчийн мотт", //Chechen
    plural: function(n) {
      if (n % 10 === 1 && n % 100 !== 11) return 1; // one
      if (2 <= n % 10 && n % 10 <= 4 && 12 <= n % 100 && n % 100 <= 14) return 2; // few
      if (n % 10 === 0 || (5 <= n % 10 && n % 10 <= 9) ||
          (11 <= n % 100 && n % 100 <= 14)) return 2; // many
      return 3; // other
    },
    number: function(n) {
      return n;
    }
  },
  "cs": {
    menuTitle: "čeština", // Czech
    plural: function(n) {
      if (n === 1) {return 1} // one
      if (n === 2 || n === 3 || n === 4) {return 2} // two--four
      return 3; // other
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "cy": {
    menuTitle: "Cymraeg", // Welsh
    plural: function(n) {
      if (n === 1) {return 1} // one // needs check
      return 2; // other // needs check
    },
    number: function(n) {
      return n; // needs check
    }
  },
  "da": {
    menuTitle: "dansk", // Danish
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "de": {
    menuTitle: "Deutsch", // German
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  // "diq": {
  //   menuTitle: "Zazaki",
  //   plural: function(n) {
  //     return 1; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  // "el": {
  //   menuTitle: "Ελληνικά", // Greek
  //   plural: function(n) {
  //     if (n === 1) {return 1} // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
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
//   "en-gb": {
//     menuTitle: "British English",
//     plural: function(n) {
//       if (n === 1) {return 1} // one
//       return 2; // other
//     },
//     number: function(n) {
//       return n;
//     }
//   },
  "eo": {
    menuTitle: "Esperanto",
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "es": {
    menuTitle: "español", // Spanish
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
//   "eu": {
//     menuTitle: "Euskara", // Basque
//     plural: function(n) {
//       if (n === 1) return 1; // one // needs check
//       return 2; // other
//     },
//     number: function(n) {
//       return n; // needs check
//     }
//   },
  "fa": {
    fontDirection: "rtl",
    menuTitle: "فارسی", // Persian
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  },
  "fi": {
    menuTitle: "suomi", // Finnish
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "fr": {
    menuTitle: "français", // French
    plural: function(n) {
      if (0 <= n && n < 2) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "gl": {
    menuTitle: "galego", // Gallician
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  // "gu": {
  //   menuTitle: "",
  //   plural: function(n) {
  //     if (n === 1) return 1; // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  // "hi": {
  //   menuTitle: "हिन्दी]",
  //   plural: function(n) {
  //     if (0 <= n && n <= 1) {return 1} // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  "he": {
    menuTitle: "עברית", // Hebrew
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
  // "hy": {
  //   menuTitle: "Հայերեն", // Armenian
  //   plural: function(n) {
  //     if (n === 1) {return 1} // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  "ia": {
    menuTitle: "interlingua",
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "it": {
    menuTitle: "italiano", // Italian
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "ja": {
    menuTitle: "日本語", // Japanese
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  },
  "kn": {
    menuTitle: "ಕನ್ನಡ", // Kannada
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  },
  "ko": {
    menuTitle: "한국어", // Korean
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  },
//   "ksh": {
//     menuTitle: "Kölsch", // Colognian
//     plural: function(n) {
//       if (n === 1) {return 1} // one
//       return 2; // other
//     },
//     number: function(n) {
//       return String(n).replace(".", ","); // replace dot by comma
//     }
//   },
  "lb": {
    menuTitle: "Lëtzebuergesch", // Luxembourgish
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
//   "lez": {
//     menuTitle: "лезгияр", // Lezgian
//     plural: function(n) { // needs check
//       if (n % 10 === 1 && n % 100 !== 11) return 1; // one
//       if (2 <= n % 10 && n % 10 <= 4 && 12 <= n % 100 && n % 100 <= 14) return 2; // few
//       if (n % 10 === 0 || (5 <= n % 10 && n % 10 <= 9) ||
//           (11 <= n % 100 && n % 100 <= 14)) return 2; // many
//       return 3; // other
//     },
//     number: function(n) {
//       return n; // needs check
//     }
//   },
//   "lrc": {
//     fontDirection: "rtl",
//     menuTitle: "لوری", // Lursi
//     plural: function(n) {
//       return 1; // other // needs check
//     },
//     number: function(n) {
//       return n; // needs check
//     }
//   },
  "lt": {
    menuTitle: "lietuvių", // Lithuanian
    plural: function(n) {
      if (n % 10 === 1 && n % 100 !== 11) {
        return 1;
      } else if (n % 10 >=2 && n % 10 <= 9 && (n % 100 < 10 || n % 100 >= 20)) {
        return 2;
      } else {
        return 3;
      }
    },
    number: function(n) {
      return n; // needs check
    }
  },
  "mk": {
    menuTitle: "македонски", // Macedonian
    plural: function(n) {
      if (n % 10 === 1 && n !== 11) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  // "ml": {
  //   menuTitle: "മലയാളം", // Malayalam
  //   plural: function(n) {
  //     return 1; // other // needs check
  //   },
  //   number: function(n) {
  //     return n; // needs check
  //   }
  // },
  // "ms": {
  //   menuTitle: "Bahasa Melayu", // Malay
  //   plural: function(n) {
  //     return 1; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  "nl": {
    menuTitle: "Nederlands", // Dutch
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "oc": {
    menuTitle: "occitan", // Occitan
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "pl": {
    menuTitle: "polski", // Polish
    plural: function(n) {
      if (n == 1) {
        return 1;
      } else if (n % 10 >=2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return 2;
      } else {
        return 3;
      }
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  // "ps": {
  //   menuTitle: "پښتو", // Pashto
  //   fontDirection: "rtl",
  //   plural: function(n) {
  //     if (n === 1) return 1; // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  "pt-br": {
    menuTitle: "português do Brasil",  // Brazilian Portuguese
    plural: function (n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function (n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "pt": {
    menuTitle: "portugusê", // Portuguese
    remap: "pt-br",
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
  "ru": {
    menuTitle: "русский", // Russian
    plural: function(n) {
      if (n % 10 === 1 && n % 100 !== 11) return 1; // one
      if (2 <= n % 10 && n % 10 <= 4 && 12 <= n % 100 && n % 100 <= 14) return 2; // few
      if (n % 10 === 0 || (5 <= n % 10 && n % 10 <= 9) ||
          (11 <= n % 100 && n % 100 <= 14)) return 2; // many
      return 3; // other
    },
    number: function(n) {
      return n;
    }
  },
  "scn": {
    menuTitle: "sicilianu", // Sicilian
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "sco": {
    menuTitle: "scots", // Scottish
    plural: function(n) {
      if (n === 1) {return 1} // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "sl": {
    menuTitle: "slovenščina", // Slovenian
    plural: function(n) {
      if (n % 100 === 1) return 1; // one
      if (n % 100 === 2) return 2; // two
      if (3 <= n % 100 && n % 100 <= 4) return 3;
      return 4; // other
    },
    number: function(n) {
      return n;
    }
  },
  // "sq": {
  //   menuTitle: "shqip", //
  //   plural: function(n) {
  //     if (n === 1) return 1; // one
  //     return 2; // other
  //   },
  //   number: function(n) {
  //     return n;
  //   }
  // },
  "sv": {
    menuTitle: "svenska", // Swedish
    plural: function(n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
    number: function(n) {
      return n;
    }
  },
  "tr": {
    menuTitle: "Türkçe", // Turkish
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  },
  "uk": {
    menuTitle: "українська", // Ukrainian
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
  "vi": {
    menuTitle: "Tiếng Việt", // Vietnamese
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return String(n).replace(".", ","); // replace dot by comma
    }
  },
  "zh-hans": {
    menuTitle: "中文（简体）", // Simplified Chinese
    plural: function(n) {
      return 1; // other
    },
    number: function(n) {
      return n;
    }
  }
};
//   "zh-hant": {
//     menuTitle: "汉语", // Traditional Chinese
//     plural: function(n) {
//       return 1; // other
//     },
//     number: function(n) {
//       return n;
//     }
//   }
// };

// ********** List of localization domains **********
exports.domains = [
  "FontWarnings",
  "HTML-CSS",
  "HelpDialog",
  "MathML",
  "MathMenu",
  "TeX"
];
