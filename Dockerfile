# trunk-ignore-all(trivy/DS026,checkov/CKV_DOCKER_2): do not insist on HEALTHCHECK
# trunk-ignore-all(trivy/DS002,checkov/CKV_DOCKER_3): do not insist on non-root user

ARG NODE_VERSION
FROM node:${NODE_VERSION}-slim as base

FROM base as build
# for future use

FROM base as production
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json", "app.js", "./"]
RUN npm install --production
USER node
CMD ["node", "app.js"]
