# Impulse Test Task

## Installation

### Prerequisites
- Docker 19.03.0+

### Setup
1. Clone the repository
```shell
git clone https://github.com/Izanaaagi/impulse-test-task.git
```
2. Copy the environment configuration file
```shell
cp .env.example .env
```
.env example:
```plaintext
# Server
NODE_ENV=dev
TZ=UTC
API_VERSION=1
API_PORT=4000
API_TITLE='Impulse API'
ENABLE_SWAGGER=1

# Database
DB_HOST=impulse-test-task-postgres
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_NAME=impulse-test-task
DB_SYNCHRONIZE=0
DB_LOGGING=1
DB_AUTO_LOAD_ENTITIES=1
DB_AUTO_LOAD_MIGRATIONS=1

# User Authentication Settings
USER_JWT_SECRET_AT=qwaszxqwaszx
USER_JWT_EXPIRES_AT=600
USER_JWT_SECRET_RT=qwaszxqwaszxsss
USER_JWT_EXPIRES_RT=18000
PASSWORD_SALT_ROUNDS=10
```
3. Run the project
```shell
docker-compose up
```