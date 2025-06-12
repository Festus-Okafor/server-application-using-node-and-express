import express from "express"
import users from "./users.js"
import bodyParser from "body-parser"
import comments from "./comments.js"
 
const app = express()
const port = 3000

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let posts = []
 

app.get('/' , (req, res) =>{
    res.send("Hello world")
})
app.get('/users', (req, res) =>{
  res.send(users)
})
app.get('/comments', (req, res) =>{
  res.send(comments)
})


app.get("/posts",(req,res)=>{
  res.send(posts)
})
//passing Data using a body parser
app.post('/createPost', (req, res) =>{
  const newPost = req.body
  posts.push(newPost)
  res.send(newPost)
})



/* 


app.route('/users')
   .get((req, res) =>{
    res.send("Get a random user")
   })
  .post((req, res) =>{
    res.send("add a random user")
   })
   .put((req, res) =>{
    res.send("update the user's information")
   })


app.get('/' , (req, res) =>{
    res.send("Hello world")
})
app.get('/users' , (req, res) =>{
    res.send("route for user")
})
app.get('/posts' , (req, res) =>{
    res.send("route for posts")
})
app.get('/comments' , (req, res) =>{
    res.send("route for comments")
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

