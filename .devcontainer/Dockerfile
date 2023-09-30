# trunk-ignore-all(trivy/DS002,trivy/DS026,checkov/CKV_DOCKER_2,checkov/CKV_DOCKER_3)
ARG NODE_VERSION
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${NODE_VERSION}
ENV NODE_ENV=development
USER node
RUN echo "set term=builtin_ansi" >> /home/node/.vimrc