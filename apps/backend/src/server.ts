import express from "express";
import cors from "cors";
import { readFile, writeFile } from "node:fs/promises";

const app = express();

app.use(cors());
app.use(express.json());

async function getData() {
  let data = "[]";
  try {
    data = await readFile("./data.json", "utf8");
  } catch (error) {
    await writeFile("./data.json", data);
  }
  return JSON.parse(data);
}

app.get("/", (_, res) => {
  res.json("OK");
});

app.get("/projects", async (_, res) => {
  const projects = await getData();
  res.json(projects);
});

app.post("/projects", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const project = {
    id: Date.now(),
    name: req.body.name,
  };

  const projects = await getData();
  projects.push(project);
  await writeFile("./data.json", JSON.stringify(projects));

  res.json(project);
});

app.listen(3001);
