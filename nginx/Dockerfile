# pull official base image
FROM nginx

# install dependencies
RUN rm /etc/nginx/conf.d/default.conf

# copy project
COPY nginx.conf /etc/nginx/conf.d/default.conf
