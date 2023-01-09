const express = require("express")
const path = require("path")
app = express()

app.listen(4000, function() {console.log("Server running..")})

let database = {
    "count": 0,
    "tasks" : [],
    "completed" : []
 }


function idxMiddleware(req, res, next) {
    // console.log(req.query) // request is the data in the url, .query shows us the data in url (we used /mesum?email=mesum@gmail.com)
    const idx = req.query.idx
    req.idx = parseInt(idx)
    next()
}

app.use(idxMiddleware);

app.get("/", function(req, res){
    res.send("Welcome to the Mesum's To-do list")
})

// All tasks
app.route("/tasks")
    .get(function(req, res){
        res.json(database.tasks)
        res.sendStatus(200)
    })
    .post(express.text(), function(req,  res){
        // console.log("body: ", req.body);
        database.tasks.push(req.body)
        database.count += 1
        // database.completed.push(database.count)
        res.sendStatus(201)
    })
    .delete(function(req, res){
        database.tasks.pop()
        database.count -= 1
        res.sendStatus(200)
    }) 
    

// Specific Tasks (?idx=1,2,3, etc)
app.route("/task")
    .get(function(req, res){
        res.json(database.tasks[req.idx])
    })
    .put(express.text(), function(req, res){
        // console.log("body: ", req.body);
        database.tasks[req.idx] = req.body
        res.sendStatus(201)
    })
    .delete(function(req, res){
        if (req.idx > -1 && req.idx <= database.count) {
            // if (idx < database.count){
            database.tasks.splice(req.idx, 1);
            // console.log("Task Removed")
            completed_idx = database.completed.indexOf(req.idx)
            database.completed.splice(completed_idx, 1)
            database.count -= 1
            res.sendStatus(200)
            // }
          }
        else{
            res.send("Invalid Index")
        }
    })

app.route("/task/completed")
    .put(function(req, res){
        database.completed.push(req.idx)
        console.log(database)
        res.json(database.tasks)
    })






