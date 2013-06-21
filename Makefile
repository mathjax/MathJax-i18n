#!gmake
#
# Version: Apache License 2.0
#
# Copyright (c) 2013 MathJax Project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

-include config.cfg

help:
	@echo ""
	@echo "make toJSON"
	@echo "  Convert MathJax localization data to MediaWiki JSON format."
	@echo "  This will read the MathJax localization data from"
	@echo "  $(MATHJAXDIR)/unpacked/localization, convert them to MediaWiki"
	@echo "  format and merge (*) them into the JSON/ data."
	@echo ""
	@echo "make toMathJax"
	@echo "  Create MathJax localization data from MediaWiki JSON format."
	@echo "  This will read the JSON/ data as well as the language"
	@echo "  descriptions from config.js and merge (*) them into"
	@echo "  $(MATHJAXDIR)/unpacked/localization/."
	@echo ""
	@echo "make pack [LANGUAGES=languagelist]"
	@echo "  Pack MathJax localization data using the YUI compressor."
	@echo "  By default, this will run the packer on all the languages of"
	@echo "  $(MATHJAXDIR)/unpacked/localization/ to update the files from"
	@echo "  $(MATHJAXDIR)/localization. You can restrict the execution to"
	@echo "  some languages with e.g. LANGUAGES=fr or LANGUAGES='de fr'."
	@echo ""
	@echo "(*) 'merge' means MathJax.Hub.Insert(destination, source) e.g."
	@echo "MathJax.Hub.Insert({a:0, b:0}, {b:1, c:1}) ==> {a:0, b:1, c:1}"
	@echo ""

toJSON:
	@echo "Generating MediaWiki JSON data..."
	$(NODEJS) toJSON.js $(MATHJAXDIR)

toMathJax:
	@echo "Generating MathJax localization data..."
	$(NODEJS) toMathJax.js $(MATHJAXDIR)

pack:
	@echo "Packing MathJax localization data..."
	@cp -r $(MATHJAXDIR)/unpacked/localization .

	@cd localization; \
	languages="$(LANGUAGES)"; \
	if [ -z "$$languages" ]; then languages=`ls`; fi; \
	for lang in $$languages; do \
		echo ""; \
		echo "Packing language '$$lang'..."; \
		cd $$lang; \
		for file in `ls`; do \
			echo $$file; \
			$(SED) "s/%%%NAME%%%/$$lang\/$$file/" <../../template-unpacked.js  > tmp1.js; \
			$(JAVA) -jar $(YUICOMPRESSOR) $$file -o tmp2.js; \
			cat tmp1.js tmp2.js > $$file; \
			rm tmp*.js; \
			done; \
		cd ..; \
		done; \
	cd ..

	@rm -rf $(MATHJAXDIR)/localization; mv localization $(MATHJAXDIR)
