CONTAINERIZER ?= podman
IMAGE_TAG ?= localhost/http-server:latest

ifeq ($(CONTAINERIZER), docker)
        CONTAINERFILE ?= Dockerfile
else
        CONTAINERFILE ?= Containerfile
endif

build: localhost-http-server.done $(CONTAINERFILE)

hello-world: public/index.html
	pandoc -thtml public/index.md -o public/index.html

localhost-http-server.done: $(CONTAINERFILE)
	$(CONTAINERIZER) build -t $(IMAGE_TAG) .
	touch $@

run: build
	$(CONTAINERIZER) run --volume ./public:/public --publish 8080:8080 --detach $(IMAGE_TAG)

stop:
	$(CONTAINERIZER) stop $$($(CONTAINERIZER) ps | awk '/http-server/ {print $$NF}');

Dockerfile: Containerfile
	cp Containerfile Dockerfile