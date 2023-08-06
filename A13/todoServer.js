const express = require("express");
const fs = require("fs");
var session = require('express-session')
const multer  = require('multer');

const db = require("./models/db");
const ListModel = require("./models/List")

// const upload = multer({ dest: 'uploads/' })
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // callback(null, file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG images are allowed'));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: fileFilter});

const app = express();

app.use(session({
  secret: 'shushradzz',
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("uploads"))

app.use(upload.single('pic'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/todoViews/index.html");
});

app.get("/todo", function(req,res){
  res.sendFile(__dirname + "/todoViews/todo.html");
});

app.get("/todo-data", function (req, res) {
  ListModel.find().then((result)=>{
        //fetching all the documents from MongoDB
        res.status(200).json(result);
    }).catch((err)=>{
        // console.log(err);
        res.status(500).send("Error");
    })
});

app.post("/formData", function (req, res) {
  const id = parseInt(Math.random()*1000);
  const userInput = req.body.userInput;
  const profilePic = req.file;
  const data = {
    id : id,
    userInput: userInput,
    completeTask: false,
    profilePic: profilePic.filename,
    profilePath : profilePic.path
  };
  
  ListModel.create(data)
    .then(function () {
      res.redirect("/todo");
    })
    .catch(function (err) {
      res.status(500).send("error");
    });
});

app.get("/todoScript", function (req, res) {
  res.sendFile(__dirname + "/todoViews/scripts/todoScript.js");
});

 
app.delete('/todo/:id',(req,res) =>{

  let id=req.params.id;
    ListModel.findOneAndDelete({id:id}).then((result)=>{
        console.log(result+"\n Deleted");
        res.status(200).send("Success");
    })
});

app.patch('/check/:id', (req,res)=>{
  const id = req.params.id;

  ListModel.updateOne({id:id},{completeTask:true}).then((result)=>{
    //updating the document in MongoDB
    // console.log(result);
    res.status(200).send("Success");
}).catch((err)=>{
    // console.log(err);
    res.status(500).send("Error");
});
});


db.init()
  .then(function () {
    console.log("db connected");

    app.listen(3000, function () {
      console.log("server on port 3000");
    });
  })
  .catch(function (err) {
    console.log(err);
  });

