const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repo = {url, title, techs, likes: 0, id: uuid()}
  repositories.push(repo);

  return response.status(201).json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex < 0) {
    return response.status(400).send();
  }
  const repo = repositories[repoIndex];
  const updatedRepo = {
    url: url ? url : repo.url, 
    title: title ? title : repo.title,
    techs: techs ? techs : repo.techs, 
    likes: repo.likes, 
    id: repo.id
  };
  repositories[repoIndex] = updatedRepo;

  return response.json(updatedRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex < 0) {
    return response.status(400).send();
  }
  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex < 0) {
    return response.status(400).send();
  }
  const repo = repositories[repoIndex];
  repo.likes += 1;
  repositories[repoIndex] = repo;

  return response.json({likes: repo.likes});
});

module.exports = app;
