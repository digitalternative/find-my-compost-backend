# Create folder for mongodb 
sudo rm -rf  mongodb
mkdir mongodb
mkdir mongodb/cfg_data
mkdir mongodb/shard0_data
sudo chown -R 1001:1001 mongodb
docker-compose stop
docker-compose rm
docker image rm nestjs-api-prod:1.0.0
docker system prune
docker-compose up -d prod
docker logs find-my-compost-backend -f
