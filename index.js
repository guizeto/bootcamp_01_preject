const express = require('express');

const server = express();
server.use(express.json());

const projects = [];
let countReq = 0;

function handleProjectExist(req, res, next){
    const {id} = req.params
    const isExcist = projects.find(item => item.id === id)

    if(!isExcist)
        return res.json({msg: 'User not exist'})

        next();
}

function handleCountReq (req, res, next) {
    countReq++
    console.log(countReq);
    next();
}

server.use(handleCountReq);

//Rotas de boas-vindas
server.get('/', (req, res) => {
    return res.json({ msg: 'Wellcome! :)' })
})

server.post('/projects', (req, res) => {
    const { title, id } = req.body;
    const project = {
        title,
        id,
        tasks: []
    }
    projects.push(project)

    return res.json({ msg: 'Create Success!', projects })
})

server.get('/projects', (req, res) => {
    return res.json({ msg: 'GET /projects', projects })
})

server.put('/projects/:id', handleProjectExist, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const project = projects.find(item => item.id === id)
    project.title = title

    return res.json({ msg: 'Update Success', project })
})

server.delete('/projects/:id', handleProjectExist, (req, res) => {
    const {id} = req.params

    const index = projects.findIndex(item => item.id === id)

    projects.splice(index, 1)

    return res.send();
})

server.post('/projects/:id/tasks', handleProjectExist, (req, res) => {
    const {id} = req.params;
    const {title} = req.body

    const project = projects.find(item => item.id === id);
    project.tasks.push(title);

    return res.json({ msg: 'Create Success!', project })
})

server.listen(3333);