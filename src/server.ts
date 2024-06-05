import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todos";

export const app = express();
const port = process.env.PORT ?? 3000;

// MW to transform body to json
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Hello World!: " + new Date().toLocaleDateString());
});

app.use("/api/todos", todoRoutes);

export const server = app.listen(port, () => {
  console.log(`Server is running at  http://localhost:${port}`);
});
