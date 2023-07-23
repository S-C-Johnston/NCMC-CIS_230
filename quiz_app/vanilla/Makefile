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

run:
	$(CONTAINERIZER) run --volume $(SRC):/usr/src/ \
		--publish=3001:3001 \
		--rm \
		--interactive --tty \
		--env TSC_WATCHFILE=PriorityPollingInterval \
		--entrypoint='["bash"]' \
		$(TAG)

start-dev:
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
