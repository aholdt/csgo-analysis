import * as path from "path";
import * as swagger from 'swagger-express-ts';
import * as express from "express";
import { Container } from "inversify";
import {
  interfaces,
  InversifyExpressServer,
  TYPE,
} from "inversify-express-utils";
import TYPES from './constant/types';
import { UserService } from './services/user.service';
import './controllers/user.controller';

let container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);

const PORT = process.env.PORT || 5000;

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app: any) => {
  app.use("/api-docs/swagger", express.static("swagger"));
  app.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );
  app.use(
    swagger.express({
      definition: {
        externalDocs: {
          url: "My url",
        },
        info: {
          title: "My api",
          version: "1.0",
        },
        responses: {
          500: {},
        },
      },
    })
  );
});
let app = server.build();

app.use(express.json());
// Serve the React static files after build
app.use(express.static("../client/build"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
