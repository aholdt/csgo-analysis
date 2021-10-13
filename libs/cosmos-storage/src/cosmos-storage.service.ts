import { CosmosClient, DatabaseRequest } from "@azure/cosmos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CosmosRepository<T> {
  objectType: string;
  get COSMOSDB_CONNECTION_STRING(): string {
    return process.env.AZURE_COSMOS_CONNECTION_STRING || "";
  }

  private readonly databaseId = "demoanapp";
  private readonly containerId = "demoanapp";

  public initialize(objectType: string): void {
    this.objectType = objectType;
  }

  public async getAll(): Promise<T[]> {
    const querySpec = {
      query: "SELECT * FROM games u WHERE u.objectType = @objectType",
      parameters: [{ name: "@objectType", value: this.objectType }],
    };

    const cosmosClient = await this.ensureCosmos();
    const result = await cosmosClient.database(this.databaseId).container(this.containerId).items.query<T>(querySpec).fetchAll();

    if (result && result.resources) {
      return result.resources;
    }
  }

  public async get(id: string): Promise<T> {
    const querySpec = {
      query: "SELECT * FROM games u WHERE u.ObjectType = @objectType AND u.id = @id",
      parameters: [
        { name: "@id", value: id },
        { name: "@objectType", value: this.objectType },
      ],
    };
    const cosmosClient = await this.ensureCosmos();
    const result = await cosmosClient.database(this.databaseId).container(this.containerId).items.query<T>(querySpec).fetchNext();

    if (result && result.resources) {
      return result.resources[0];
    }
  }

  public async upsert(item: T): Promise<T> {
    const cosmosClient = await this.ensureCosmos();
    const result = await cosmosClient.database(this.databaseId).container(this.containerId).items.upsert<T>(item);
    return result.resource;
  }

  public async bulkUpsert(items: T[]): Promise<void> {
    const cosmosClient = await this.ensureCosmos();
    for (const item of items) {
      await cosmosClient.database(this.databaseId).container(this.containerId).items.upsert<T>(item);
    }
    // const chunks = _.chunk(items, 50);
    // for (const chunk of chunks) {
    //   const operations = [];
    //   for (let i = 0; i < chunk.length; i++) {
    //     operations.push({
    //       operationType: BulkOperationType.Upsert,
    //       resourceBody: chunk[i],
    //     });
    //   }
    //   await cosmosClient.database(this.databaseId).container(this.containerId).items.bulk(operations);
    // }
  }

  private async ensureCosmos() {
    const client = new CosmosClient(this.COSMOSDB_CONNECTION_STRING);

    const database = await client.databases.createIfNotExists(<DatabaseRequest>{
      id: this.databaseId,
      throughput: 400,
    });

    await client
      .database(database.database.id)
      .containers.createIfNotExists({ id: this.containerId, partitionKey: "/id" }, { offerThroughput: 400 });
    return client;
  }
}
