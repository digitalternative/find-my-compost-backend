# Create folder for mongodb 
mkdir mongodb
mkdir mongodb/cfg_data
mkdir mongodb/shard0_data
# Copy files for android app mobile icons, screenshot, assetlinks, robot,...
sudo cp -R /home/debian/find-my-compost-frontend/public/ /opt/appdata/letsencrypt/config/www/
# Copy Nginx config
sudo cp config/nginx/site-confs/default /opt/appdata/letsencrypt/config/nginx/site-confs/default
# Remove old images
docker-compose stop
docker-compose rm
docker image rm nestjs-api-prod:1.0.0
docker system prune
# Change right for database
sudo chown -R 1001:1001 mongodb
sudo chmod -R 777 mongodb
# Build and start container
docker-compose up -d
docker logs find-my-compost-backend -f
