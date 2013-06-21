MathJax-i18n
============

This repository contains localization data for MathJax as well as tools to
convert them. The localization data are organized as follows:

* config.js: configuration for languages and domains.
* JSON/: the localizable strings in JSON jquery.i18n format.
 
@translators: translations should ideally be done on TranslateWiki and the JSON
files commited here.  Do not forget to update config.js if you add new
languages. Use the conversion tools if you wish to integrate the new translation
data in your local MathJax installation.

@MathJax developers: when new strings are created or removed, be sure to update
config.js and to use the conversion tools to update the JSON files
appropriately. Do not forget to inform the translators about obsolete/new
strings on the MathJax Project TranslateWiki page.

To use the conversion tools, please edit the 'config.cfg' file and run
'make help' for further details.
