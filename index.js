import express from "express"
import bodyParser from "body-parser"
import comments from "./comments.js"
import users from "./users.js"
 
const app = express()
const port = 3000

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let posts = []
app.set("view engine", "ejs")

// for all the get routes
app.get('/' , (req, res) =>{
  console.log("Hellow boy")
    res.render("index")
})
app.get('/users', (req, res) =>{
  res.send(users)
})
app.get('/comments', (req, res) =>{
  const commentId = req.params.id
  res.send(comments)
  })

//below is for the posts
app.get("/posts",(req,res)=>{
  res.send(posts)
})

//passing Data using a body parser
app.post('/createPost', (req, res) =>{
  const newPost = req.body
  posts.push(newPost)
  res.send(newPost)
})

 app.get('/:id', (req, res) =>{
  res.send(`Get a user's ID: ${ req.params.id}`)
}) 

//below is for the put
app.put('/:id', (req, res)=>{
 res.send(`Update a user ID: ${req.params.id}`)
})

app.delete('/:id', (req, res)=>{
 res.send(`Delete a user ID: ${req.params.id}`)
})

/* app.put('/user/:userId', (req, res) =>{
  res.send('')
})
 */


/* 
let users = []; // In-memory array for todos

// Get all users
app.get('/users', (req, res) => {
  res.json(todos);
});

// Add a new post route
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTodo = { id: Date.now(), task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(400).json({ error: 'Task is required' });
  }
}); */



/* 

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(200).json({ message: 'Todo deleted' });
}); */


//error-handling middleware 
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () =>{
    console.log(`server is running at port: `, port)
})

