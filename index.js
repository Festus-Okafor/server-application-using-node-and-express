import express from "express"
import bodyParser from "body-parser"
import comments from "./comments.js"
import users from "./users.js"

 
const app = express()
const port = 3000

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set("view engine", "ejs")
let posts = []

// The get routes below
app.get('/' , (req, res) =>{
  console.log("Hellow")
    res.render("index")
})
app.get('/api/users', (req, res) =>{
  res.send(users)
})
app.get('/api/comments', (req, res) =>{
  const commentId = req.params.id
  res.send(comments)
  })

//below is for the posts
app.get("/api/posts",(req,res)=>{
  res.send(posts)
})

//passing Data using a body parser
app.post('/createPost', (req, res) =>{
  //parsed data from post is located/saved within my req.body

  if(req.body.name && req.body.username && req.body.email){
    if(posts.find((u)=>u.username == req.body.username)){
      res.json({error: "Username is already assigned"})
      return;
    }
    const newPost = {
      id: posts[posts.length-1].id +1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    }
  } 
  const newPost = req.body
  posts.push(newPost)
  res.send(newPost)
})

/*  app.get('/:id', (req, res) =>{
  res.send(`Get a user's ID: ${ req.params.id}`)
})  */

//below is for the patch
app.patch("/api/users/:id", (req, res)=>{
    // Within the PATCH request route, we allow the client
    // to make changes to an existing user in the database.
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  res.send(`Update user ID: ${req.params.id}`)
})


app.delete('/:id', (req, res)=>{
  // The DELETE request route simply removes a resource.
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  
 res.send(`User with the input ID deleted: ${req.params.id}`)
})

// Custom 404 (not found) middleware.
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

//error-handling middleware 
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () =>{
    console.log(`server is running at port: `, port)
})

