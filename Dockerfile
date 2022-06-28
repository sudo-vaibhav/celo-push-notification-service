FROM node:14 AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY ./channel-manager-app/package.json .
COPY ./channel-manager-app/yarn.lock .
RUN yarn install --production
# Copy app files
COPY ./channel-manager-app/. .
RUN ls 
# Build the app
RUN yarn build
# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]