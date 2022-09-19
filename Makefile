start-frontend:
	npx react-scripts start -timeout=1000

start-backend:
	npx start-server

start:
	npm start

install:
	npm ci

build:
	npm run build
	npm run start

lint:
	npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml .