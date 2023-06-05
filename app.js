const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');


app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.json());

// Routes of Rest API
/**
 * TaskList- Create, Update, ReadTaskListById, ReadAllTaskList
 * Task- Create, Update, ReadTaskById, ReadAllTask
 * 
 */

app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then((lists) => {
            res.status(200).send(lists);

        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
});
app.get('/tasklists/:tasklistId', (req, res) => {
    let tasklistId = req.params.tasklistId;
    TaskList.find({ _id: tasklistId })
        .then((taskList) => {
            res.status(200).send(taskList);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);

        });
});

app.post('/tasklists', (req, res) => {
    console.log(req.body)
    let taskListObject = { 'title': req.body.title };
    TaskList(taskListObject).save()
        .then((taskList) => {
            res.status(201).send(taskList);
        })
        .catch((error) => {
            res.status(500);
            console.log(error);
        });
});
// Full Update of object
app.put('/tasklists/:tasklistId', (req, res)=>{
    TaskList.findOneAndUpdate({_id: req.params.tasklistId}, {$set: req.body})
    .then((taskList) => {
        res.status(200).send(taskList);
    })
    .catch((error) => {
        console.log(error);
        res.status(500);

    });
});
// update only one field of an object
app.patch('/tasklists/:tasklistId', (req, res)=>{
    TaskList.findOneAndUpdate({_id: req.params.tasklistId}, {$set: req.body})
    .then((taskList) => {
        res.status(200).send(taskList);
    })
    .catch((error) => {
        console.log(error);
        res.status(500);

    });
});

app.delete('/tasklists/:tasklistId', (req, res)=>{
    TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((taskList) => {
        res.status(200).send(taskList);
    })
    .catch((error) => {
        console.log(error);
        res.status(500);

    });
});

// Creating tasks now
app.get('/tasklists/:tasklistId/tasks', (req, res)=>{
    Task.find({_taskListId: req.params.tasklistId})
    .then((tasks) => {
        res.status(201).send(tasks);
    })
    .catch((error) => {
        console.log(error);
        res.status(500);

    });
});
// Create task inside tasklist
app.post('/tasklists/:tasklistId/tasks', (req, res) => {
    console.log(req.body)
    let taskObject = { 'title': req.body.title, '_taskListId': req.params.tasklistId };
    Task(taskObject).save()
        .then((task) => {
            res.status(201).send(task);
        })
        .catch((error) => {
            res.status(500);
            console.log(error);
        });
});


app.get('/tasklists/:tasklistId/tasks/:taskId', (req, res)=>{
    Task.findOne({_taskListId: req.params.tasklistId, _id: req.params.taskId})
    .then((task) => {
        res.status(201).send(task);
    })
    .catch((error) => {
        console.log(error);
        res.status(500);

    });
});

app.patch('/tasklists/:tasklistId/tasks/:taskId', (req, res)=>{
    Task.findOneAndUpdate({_taskListId: req.params.tasklistId, _id: req.params.taskId}, {$set: req.body})
    .then((task) => {
        res.status(200).send(task);
    })
    .catch((error) => {
        console.log(error);
        res.status(500);

    });
});

app.delete('/tasklists/:tasklistId/tasks/:taskId', (req, res)=>{
    Task.findByIdAndDelete(req.params.taskId)
    .then((task) => {
        res.status(200).send(task);
    })
    .catch((error) => {
        console.log(error);
        res.status(500);

    });
});

// Using Arrow function
app.listen(3000, () => {
    console.log("Server started on port 3000");
});