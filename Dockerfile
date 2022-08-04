# FROM specifies the base image (also called the parent image).  In this case we will use Ubuntu OS
FROM nginx:1.17.1-alpine
# Copy all files from the dist directory to the directory where ngix hosts the files to serve at a specified port
COPY dist/social-media-angular /usr/share/nginx/html