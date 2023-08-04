const express = require("express");
const fs = require("fs");
var session = require('express-session')
const multer  = require('multer');
const { profile } = require("console");

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
  readAllTodos(function (err, data) {
    if (err) {
      res.status(500).send("error");
      return;
    }
    //res.status(200).send(JSON.stringify(data));
    res.status(200).json(data);
  });
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
  }
  saveTodoInFile(data, function (err) {
    if (err) {
      res.status(500).send("error");
      return;
    }
    res.redirect("/todo");
  });
});

app.get("/todoScript", function (req, res) {
  res.sendFile(__dirname + "/todoViews/scripts/todoScript.js");
});


function readAllTodos(callback) {
  fs.readFile("./treasure.txt", "utf-8", function (err, data) {
    if (err) {
      callback(err);
      return;
    }

    if (data.length === 0) {
      data = "[]";
    }

    try {
      data = JSON.parse(data);
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  });
}

function saveTodoInFile(todo, callback) {
  readAllTodos(function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    
    data.push(todo);

    fs.writeFile("./treasure.txt", JSON.stringify(data), function (err) {
      if (err) {
        callback(err);
        return;
      } 
      callback(null);
    });
  });
}

 
app.delete('/todo/:id',(req,res) =>{
  readAllTodos(function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    const idToDelete = parseInt(req.params.id);
    for(let i=0;i<data.length;i++)
    {
      if(data[i].id == idToDelete)
      {
        fs.unlink(data[i].profilePath, (err)=>{
            if(err)
            {
              res.status(500).send("error");
              return;
            }
        });
      }
    }
    // const idToDelete = parseInt(req.params.id);
    const todo = data.filter(({id}) => id !== idToDelete);
    
    
    
    fs.writeFile("./treasure.txt", JSON.stringify(todo), function (err) {
      if (err) {
        res.status(500).send("error");
        return;
      } 

    });
    res.status(200).send("success");
  });
});

app.patch('/check/:id', (req,res)=>{
  const idToCheck = req.params.id;
  readAllTodos(function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    
    let change = data.map(function(check){
      if(check.id == idToCheck){
        check.completeTask = req.body.check;
      }
      return check;
    });

    fs.writeFile("./treasure.txt", JSON.stringify(change), function (err) {
      if (err) {
        res.status(500).send("error");
        return;
      } 
    });
    res.status(200).send("success");
  })
});
app.listen(3000, function () {
  console.log("server on port 3000");
});
