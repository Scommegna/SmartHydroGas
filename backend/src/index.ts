import "dotenv/config";
import connectDB from "./database/database";
import express from "express";

import cors from "cors";
import bodyParser from "body-parser";

import path from "path";

import { router as uploadRoutes } from "./routes/uploadRoutes";
import { router as userRoutes } from "./routes/userRoutes";

import { sessionConfig } from "./config/sessionConfig";

import swaggerUi from "swagger-ui-express";

import YAML from "yamljs";
import session from "express-session";

const app = express();
const port = 80;
const swaggerFilePath = path.resolve(__dirname, "./swagger/swagger.yaml");

connectDB();

app.use(session({
  secret: "secretKey", 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000, 
    httpOnly: true, 
    sameSite: "lax", 
  }
}));

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,               
}));

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionConfig);

app.use("/", uploadRoutes);
app.use("/", userRoutes);

const swaggerDocument = YAML.load(swaggerFilePath);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
