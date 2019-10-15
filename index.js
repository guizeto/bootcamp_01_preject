const express = require('express');

const server = express();
server.use(express.json())


function checkProjectExist (req, res, next) {
  const { project } = req.body;

  next();
}

const projects = [];

// { id: "1", title: 'Novo projeto', tasks: [] }
server.post('/projects', (req, res) => {
  const project = req.body;
  projects.push(project);
  return res.json({msg :'Registered Product', project})
})

server.get('/projects',  (req, res) => {
  const {project} = req.body;

  return res.json(projects)
})

server.put('/projects',  (req, res) => {
  const {project} = req.body;

  return res.json({msg :'Registered Product'})
})

server.delete('/projects',  (req, res) => {
  const {project} = req.body;

  return res.json({msg :'Registered Product'})
})

server.post('/projects',  (req, res) => {
  const {project} = req.body;

  return res.json({msg :'Registered Product'})
})

server.listen(3000)