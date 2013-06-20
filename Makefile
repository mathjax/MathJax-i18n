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
	@echo "  Convert MathJax localization data to WikiMedia JSON format."
	@echo ""
	@echo "make toMathJax"
	@echo "  Create MathJax localization data from WikiMedia JSON format."
	@echo ""
	@echo "make pack [LANGUAGES=languagelist]"
	@echo "  Pack MathJax localization data using the YUI compressor."
	@echo "  This will apply the packer to all the languages. You can"
	@echo "  select one or more languages using e.g. LANGUAGES=fr"
	@echo "  or LANGUAGES='de fr'."

toJSON:
	@echo "Generating WikiMedia JSON data..."
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
			$(SED) "s/%%%NAME%%%/\/MathJax\/localization\/$$lang\/$$file/" <../../template.js  > tmp1.js; \
			$(JAVA) -jar $(YUICOMPRESSOR) $$file -o tmp2.js; \
			cat tmp1.js tmp2.js > $$file; \
			rm tmp*.js; \
			done; \
		cd ..; \
		done; \
	cd ..

	@rm -rf $(MATHJAXDIR)/localization; mv localization $(MATHJAXDIR)
