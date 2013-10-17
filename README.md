MathJax-i18n
============

This repository contains localization data for MathJax as well as tools to
convert them. The localization data are organized as follows:

* config.js: configuration for languages and domains.
* JSON/: the localizable strings in JSON jquery.i18n format.
 
See also the [Statistics on TranslateWiki](https://translatewiki.net/w/i.php?title=Special:MessageGroupStats&group=out-mathjax-0-all#sortable:3=asc).

@translators: translations should ideally be done on TranslateWiki and the JSON
files commited here. Do not forget to update config.js if you add new
languages.
  - You can check the ChangeLog file to track string changes by MathJax
    developers.
  - Use the conversion tools if you wish to integrate the new translation
    data in your local MathJax installation.
  - The "qqq" language contains string descriptions that may be helpful.
  - Starting with MathJax v2.3, the Web page test/localization.html may be used
    to test the localization strings in context.

@MathJax developers: when new strings are created or removed, be sure to update
config.js and to use the conversion tools to update the JSON files
appropriately. If you add/modify/remove strings, do forget to update the
ChangeLog file and to inform the translators about obsolete/new strings on the
MathJax Project TranslateWiki page.

To use the conversion tools, please edit the 'config.cfg' file and run
'make help' for further details.
