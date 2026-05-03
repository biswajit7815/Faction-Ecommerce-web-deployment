#!/bin/bash

echo "--- 1. Resetting Permissions & AppArmor ---"
sudo systemctl reload apparmor || true

echo "--- 2. Cleaning up Stuck Containers ---"
# Forcefully remove everything related to this project
sudo docker-compose down -v --remove-orphans || true
sudo-docker rm -f $(sudo docker ps -aq) 2>/dev/null || true

echo "--- 3. Pruning Docker System ---"
sudo docker system prune -f

echo "--- 4. Building and Starting Fresh ---"
sudo docker-compose up -d --build

echo "--- 5. Checking Logs ---"
sudo docker ps
