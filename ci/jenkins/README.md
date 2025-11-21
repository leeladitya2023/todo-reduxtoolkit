Jenkins + Docker CI/CD for `todoReduxToolkit`

Overview
--------
This document explains how to run a Jenkins pipeline that builds, tests, and packages the React `todoReduxToolkit` app into a Docker image and optionally deploys it.

Jenkins Requirements
--------------------
- Jenkins (2.263+ recommended) with:
  - Docker installed on the Jenkins agent (or run on Docker-enabled nodes)
  - Credentials configured in Jenkins:
    - `DOCKERHUB_CREDENTIALS` (username/password) for docker push
    - `SSH_CREDENTIALS` (optional) for remote deploy via SSH

Pipeline (Jenkinsfile)
----------------------
The repository contains a `Jenkinsfile` at `REACT/11todoReduxToolkit/Jenkinsfile`. It runs these stages:
- Checkout
- Install (npm ci)
- Test (npm test)
- Build (npm run build)
- Docker Build & Push (docker build + docker push)
- Deploy (scp/kubectl/helm) — optional

How to configure
----------------
1. Create a Jenkins Pipeline job (or Multibranch Pipeline) and point it to your repository.
2. Add credentials:
   - `DOCKERHUB_CREDENTIALS` (type: Username with password)
   - `SSH_CREDENTIALS` if you plan to deploy via SSH
3. Ensure the Jenkins agent has Docker CLI and permissions to run docker commands.

Local testing with Docker
-------------------------
Build locally:

```bash
cd REACT/11todoReduxToolkit
npm ci
npm run build
# Build docker image
docker build -t todo-reduxtoolkit:local .
# Run
docker run -p 8080:80 todo-reduxtoolkit:local
```

Notes
-----
- The `nginx/default.conf` file should exist under `REACT/11todoReduxToolkit/nginx/default.conf` to configure static file serving.
- If you prefer to push images to Docker Hub or another registry, set `DOCKERHUB_CREDENTIALS` and update `IMAGE_NAME` in the `Jenkinsfile`.

Security
--------
Do not store secrets in the repo. Use Jenkins Credentials and access them with `withCredentials` in the pipeline.
