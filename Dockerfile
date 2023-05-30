#FROM node:latest
#MAINTAINER @AndreySHSH <laptev.andrey@icloud.com>
#
#WORKDIR /app
#
#COPY . .
#
##RUN yarn install
##RUN yarn build
#
#RUN yarn add global serve
#RUN chmod +x /opt/program/serve
#
#EXPOSE 3000
#
##RUN #serve -s build
##
##FROM nginx:alpine
##WORKDIR /usr/share/nginx/html
##COPY --from=Builder /app/build/ .
##
##EXPOSE 80
##
#ENTRYPOINT ["serve", "-s", "build;"]


# build environment
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . ./

RUN brunch build -p

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
