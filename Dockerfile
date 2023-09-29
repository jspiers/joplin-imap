# trunk-ignore-all(trivy/DS026,checkov/CKV_DOCKER_2): do not insist on HEALTHCHECK
# trunk-ignore-all(trivy/DS002,checkov/CKV_DOCKER_3): do not insist on non-root user

ARG NODE_VERSION=20-bookworm-slim
FROM node:${NODE_VERSION} as base
FROM base as release
USER node
COPY app.js ${HOME}/app.js
WORKDIR ${HOME}
# RUN npm install
# CMD ["sleep", "infinity"]
CMD ["node", "app.js"]

