Requirements

Installed Docker 19.03.0+

If you want to run app locally not in docker container then use node 20+

nvm use

Migrations:
 - Generate: npm run migration:create --name=Test1
 - Up: npm run migration:up
 - Down: npm run migration:down