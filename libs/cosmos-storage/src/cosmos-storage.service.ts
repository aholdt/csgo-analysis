import { CosmosClient, DatabaseRequest } from "@azure/cosmos";
import { Injectable } from "@nestjs/common";
import { RepositoryItem } from "./public-models/repository-item";

@Injectable()
export class CosmosRepository<T extends RepositoryItem> {
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
    console.log(this.objectType);
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

  private async ensureCosmos() {
    const client = new CosmosClient(this.COSMOSDB_CONNECTION_STRING);

    const database = await client.databases.createIfNotExists(<DatabaseRequest>{
      id: this.databaseId,
      throughput: 400,
    });

    await client.database(database.database.id).containers.createIfNotExists({ id: this.containerId }, { offerThroughput: 400 });
    return client;
  }
}
