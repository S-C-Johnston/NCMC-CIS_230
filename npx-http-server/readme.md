`Containerfile` contains the OCI compliant node http-server image
configuration, for use with step 1 of the Microsoft PWA tutorial.

`Makefile` contains the build steps necessary to for building the OCI image

`local_profile.sh` pulls double duty to define an alias which can be imported
(it uses podman by default, which is my container platform of choice), and it
documents the command arguments to run this appropriately.

When run, the web server should be available at localhost:8080
