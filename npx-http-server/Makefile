podman: podman-localhost-http-server.done

hello-world: public/index.html
	pandoc -thtml public/index.md -o public/index.html

podman-localhost-http-server.done: Containerfile
	podman build -t localhost/http-server:latest .
	touch podman-localhost-http-server.done

podman-run: podman
	podman run --volume ./public:/public --publish 8080:8080 --detach localhost/http-server:latest

podman-stop:
	podman stop $$(podman ps | awk '/http-server/ {print $$NF}');

dockerfile:
	cp Containerfile Dockerfile

docker: docker-localhost-http-server.done dockerfile

docker-run: docker
	docker run --volume ./public:/public --publish 8080:8080 --detach localhost/http-server:latest

docker-stop:
	docker stop $$(docker ps | awk '/http-server/ {print $$NF}');

docker-localhost-http-server.done: dockerfile
	docker build -t localhost/http-server:latest .
	touch docker-localhost-http-server.done
