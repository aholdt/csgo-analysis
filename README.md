### Generate api client

1. Ensure the server app has been running after api changes
2. Run 'npm run generate-api'

### Setup system variables

#### Blob storage connection string

Windows:

- `setx CUSTOMCONNSTR_AZURE_STORAGE_CONNECTION_STRING "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;"`

### Run Azurite (azure blob storage emulator)

### Cosmos storage connection string

Windows:

- `setx CUSTOMCONNSTR_AZURE_COSMOS_CONNECTION_STRING "DefaultEndpointsProtocol=https;AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==;"`

#### With docker

- Install docker
- Run docker-compose from /docker folder

#### With npm package

- `npm install -g azurite`
- Run `azurite --silent --location c:\azurite --debug c:\azurite\debug.log --loose`
