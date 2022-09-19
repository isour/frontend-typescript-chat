start-frontend:
	cd frontend && npm start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

install:
	npm ci

build:
	npm run build
	npm run start