var express = require('express');
var app = express();

var cors = require('cors');   //FOR diffrent port run on same web like connect to React app
app.use(cors());

var bodyParser =require('body-parser');
const { urlencoded } = require('body-parser');

var mongoose = require('mongoose');
var DbUrl = 'mongodb://127.0.0.1:27017/todo';
//when facing compile time error
var whenFindEroor = {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false }; 
mongoose.connect(DbUrl, whenFindEroor );
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));
//---------------------------------------------------
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
const User = mongoose.model("User", userSchema);

//------------------------------------------------------------------------------
const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});
const Todos = mongoose.model("Todos", todosSchema);

//---------------------------------------------------
app.get('/',function(req,res){
    res.send('<h2>its Working<h2/>');
}); 

app.post('/register',async(req,res)=>{
    const { username ,password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (user) {
      res.status(500);
      res.json({
      message: "Username already exists",
    });
    return;
  }
    await User.create({ username ,password });
    res.json({
       message:"success",
    });
});


app.post('/login',async(req,res)=>{
  const { username ,password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
    message: "Invalid login",
  });
  return;
}
  res.json({
     message:"success login",
  });
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const { todos } = await Todos.findOne({ userId: user._id }).exec();
  res.json(todos);
});


//----------------------
const PORT = 4000;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    app.listen(PORT,() => {
        console.log(`Server Running on port : http://localhost:${PORT}`)
    })
});

