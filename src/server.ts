import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json"

const app = express();

app.use(bodyParser.json());
RegisterRoutes(app);

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof Error) {
    return res.status(500).send(err.message);
  }
  next();
});

// Swagger route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});