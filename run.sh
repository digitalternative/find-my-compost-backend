# Create folder for mongodb 
mkdir mongodb
mkdir mongodb/cfg_data
mkdir mongodb/shard0_data
sudo chown -R 1001:1001 mongodb
sudo chown -R 777 mongodb
sudo cp config/nginx/site-confs/default /opt/appdata/letsencrypt/config/nginx/site-confs/default
docker-compose stop
docker-compose rm
docker image rm nestjs-api-prod:1.0.0
docker system prune
docker-compose up -d prod
docker logs find-my-compost-backend -f
