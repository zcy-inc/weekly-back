FROM node:14-alpine
COPY . /weekly-back
WORKDIR /weekly-back
RUN npm install -g pm2 
RUN npm install 
EXPOSE 3030

# CMD sed -i "s/localhost/$SERVER_IP/g" /weekly-back/app/config/httpsConfig.js;pm2-runtime start ecosystem.config.js --env=production
CMD pm2-runtime start ecosystem.config.js --env=production