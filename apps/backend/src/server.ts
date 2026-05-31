import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let projects: any[] = [];

app.get("/", (_, res) => {
  res.json("OK");
});

app.get("/projects", (_, res) => {
  res.json(projects);
});

app.post("/projects", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const project = {
    id: Date.now(),
    name: req.body.name,
  };

  projects.push(project);

  res.json(project);
});

app.listen(3001);
