CONTAINERIZER ?= podman
SRC ?= ./app
TAG ?= docker.io/library/node:18-bullseye
SERVER-TAG ?= localhost/http-server:latest

ifeq ($(CONTAINERIZER), docker)
        CONTAINERFILE ?= Dockerfile
else 
        CONTAINERFILE ?= Containerfile
endif


build: build.done

Dockerfile: Containerfile
	cp Containerfile Dockerfile

build.done: $(CONTAINERFILE)
	$(CONTAINERIZER) build . -t $(TAG)
	touch $@

app-build: \
	$(patsubst app/public/%,app/build/%,$(shell find app/public -type f)) \
	$(patsubst app/src/styles/%,app/build/styles/%,$(shell find app/src/styles -type f))

app/build/%: app/public/%
	@mkdir -p $(@D)
	cp $< $@

app/build/styles/%: app/src/styles/%
	@mkdir -p $(@D)
	cp $< $@

app-node_modules: $(shell jq -r '.dependencies | keys[]' app/package.json | sed 's/^/app\/build\/node_modules\//')

app/build/node_modules/%: app/node_modules/%
	mkdir -p $(@D)
	rsync -a --links app/node_modules/$* $(@D)

run: app-build app-node_modules
	$(CONTAINERIZER) run --volume $(SRC):/usr/src/ \
		--publish=3001:3001 \
		--rm \
		--interactive --tty \
		--env TSC_WATCHFILE=PriorityPollingInterval \
		--entrypoint='["bash"]' \
		$(TAG)

start-dev: app-build app-node_modules
	$(CONTAINERIZER) run --volume $(SRC):/usr/src/ \
		--publish=3001:3001 \
		--detach \
		--rm \
		--env TSC_WATCHFILE=PriorityPollingInterval \
		--workdir=/usr/src \
		--entrypoint='["npx", "tsc", "-w"]' \
		$(TAG)
	$(CONTAINERIZER) run --volume $(SRC):/usr/src/ \
		--publish=8080:8080 \
		--detach \
		--rm \
		--workdir=/usr/src/build \
		$(SERVER-TAG)


stop:
	$(CONTAINERIZER) stop $$($(CONTAINERIZER) ps | awk -v tag=$(TAG) '$$0 ~ tag {print $$NF}');
