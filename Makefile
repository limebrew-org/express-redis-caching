#? Run Local

run_server_local:
	npm run start:local

run_prettier:
	npm run prettier

#? Docker Compose V1

compose_dev_up_v1:
	docker-compose -f docker-compose.dev.yml up -d --build

compose_dev_down_v1:
	docker-compose -f docker-compose.dev.yml down


compose_prod_up_v1:
	docker-compose -f docker-compose.prod.yml up -d --build

compose_prod_down_v1:
	docker-compose -f docker-compose.prod.yml down


#? Docker Compose V2

compose_dev_up_v2:
	docker compose -f docker-compose.dev.yml up -d --build

compose_dev_down_v2:
	docker compose -f docker-compose.dev.yml down


compose_prod_up_v2:
	docker compose -f docker-compose.prod.yml up -d --build

compose_prod_down_v2:
	docker compose -f docker-compose.prod.yml down