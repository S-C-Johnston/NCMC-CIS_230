podman: podman-localhost-http-server.done

docker: docker-localhost-http-server.done

podman-localhost-http-server.done: Containerfile
	podman build .

docker-localhost-http-server.done: Containerfile
	docker build .
