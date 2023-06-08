podman-run: podman
	podman run --volume ./public:/public --publish 8080:8080 --detach localhost/http-server:latest

docker-run: docker
	docker run --volume ./public:/public --publish 8080:8080 --detach localhost/http-server:latest

podman-stop:
	podman stop $$(podman ps | awk '/http-server/ {print $$NF}');

docker-stop:
	docker stop $$(docker ps | awk '/http-server/ {print $$NF}');

podman: podman-localhost-http-server.done

docker: docker-localhost-http-server.done Dockerfile

podman-localhost-http-server.done: Containerfile
	podman build -t localhost/http-server:latest .
	touch podman-localhost-http-server.done

docker-localhost-http-server.done: Dockerfile
	docker build -t localhost/http-server:latest .
	touch docker-localhost-http-server.done

Dockerfile: Containerfile
	cp Containerfile Dockerfile
