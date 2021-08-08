// @ts-nocheck
/*
    Cats example generated
    The cats API description
    version: 1.0

*/

export class Configuration {
  basePath? = "";
  fetchMethod = window.fetch;
  headers?: any = {};
  getHeaders: any = () => {
    return {};
  };

  constructor(config: Configuration | any) {
    if (config) {
      if (config.basePath) {
        this.basePath = config.basePath;
      }
      if (config.fetchMethod) {
        this.fetchMethod = config.fetchMethod;
      }
      if (config.headers) {
        this.headers = config.headers;
      }
      if (config.getHeaders) {
        this.getHeaders = config.getHeaders;
      }
    }
  }
}

export class CreateCatDto {
  name?: string;
  age?: number;
  breed?: string;

  constructor(obj: CreateCatDto) {
    this.name = obj.name;
    this.age = obj.age;
    this.breed = obj.breed;
  }
}

export class Cat {
  age?: number;
  breed?: string;
  name?: string;

  constructor(obj: Cat) {
    this.age = obj.age;
    this.breed = obj.breed;
    this.name = obj.name;
  }
}

export class MethodOptions {
  headers?: any = {};
  returnResponse?: boolean = false;

  constructor(options: MethodOptions) {
    if (options.headers) {
      this.headers = options.headers;
    }
    if (options.returnResponse) {
      this.returnResponse = options.returnResponse;
    }
  }
}

export class CatsIdGetArgs {
  id: string;

  constructor(args: CatsIdGetArgs) {
    this.id = args.id;
  }
}

export class CatsApi {
  private readonly config: Configuration;

  constructor(config: Configuration | any) {
    this.config = new Configuration(config);
  }

  catsPost(
    body?: CreateCatDto,
    options: MethodOptions | any = {}
  ): Promise<any> {
    const { fetchMethod, basePath, headers, getHeaders } = this.config;
    let url = "/cats";
    const params = new URLSearchParams();
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders(),
          ...options.headers,
        },
        body: "object" === typeof body ? JSON.stringify(body) : body,
      });
      promise.then((response) => {
        if (response.status === 200 || response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      promise.catch((error) => reject(error));
    });
  }

  catsIdGet(
    args: CatsIdGetArgs,
    options: MethodOptions | any = {}
  ): Promise<Cat> {
    const { id } = args;
    const { fetchMethod, basePath, headers, getHeaders } = this.config;
    let url = "/cats/{id}";
    url = url.split(["{", "}"].join("id")).join(encodeURIComponent(String(id)));
    const params = new URLSearchParams();
    const query = params.toString();
    return new Promise((resolve, reject) => {
      const promise = fetchMethod(basePath + url + (query ? "?" + query : ""), {
        method: "get",
        headers: { ...headers, ...getHeaders(), ...options.headers },
      });
      if (options.returnResponse) {
        promise.then((response) => resolve(response as any));
      } else {
        promise
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
              return response.json();
            } else {
              reject(response);
            }
          })
          .then((data) => resolve(data));
      }
      promise.catch((error) => reject(error));
    });
  }
}
