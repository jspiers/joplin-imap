# trunk-ignore-all(trivy/DS026,checkov/CKV_DOCKER_2): do not insist on HEALTHCHECK
# trunk-ignore-all(trivy/DS002,checkov/CKV_DOCKER_3): do not insist on non-root user

ARG NODE_VERSION=20-bookworm-slim
FROM node:${NODE_VERSION} as base
FROM base as release
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
ENV NODE_ENV=production
RUN npm install --production
# WORKDIR /app/node_modules/joplin-plugin-email
USER node
CMD ["npm", "version"]
