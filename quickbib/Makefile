.PHONY: clean all

all:
	mkdir -p ./target
	rm -f ./target/quickbib.xpi
	zip -r ./target/quickbib.xpi content/ locale/ skin/ chrome.manifest install.rdf

clean:
	rm -rf ./target
