FROM node:14.15.4-buster-slim as builder

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install yarn dependencies
RUN yarn install

# Bundle app source
COPY . .

# Build the folder
RUN yarn build:rs

# Handle Nginx
FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# New
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
