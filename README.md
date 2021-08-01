### Generate api client
1. Ensure the server app has been running after api changes
2. Run 'npm run generate-api'


### Run Azurite (azure blob storage emulator)

#### With docker
* Install docker
* Run docker-compose from /docker folder

#### With npm package
* `npm install -g azurite`
* Run `azurite --silent --location c:\azurite --debug c:\azurite\debug.log --loose`
