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
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

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
  // if(!req.session.isLoggedIn){
  //   res.redirect('/');
  //   return;
  // }
  // const userName = req.query.user;
  // res.render('index', { name : userName });
  res.sendFile(__dirname + "/todoViews/index.html");
});




// app.get("/about", function (req, res) {
//   // if(!req.session.isLoggedIn){
//   //   res.redirect('/login');
//   //   return;
//   // }
//   res.sendFile(__dirname + "/todoViews/about.html");
// });

// app.get("/contact", function (req, res) {
//   // if(!req.session.isLoggedIn){
//   //   res.redirect('/login');
//   //   return;
//   // }
//   res.sendFile(__dirname + "/todoViews/contact.html");
// });

app.get("/todo", function (req, res) {
  // if(!req.session.isLoggedIn){
  //   res.redirect('/login');
  //   return;
  // }
  res.sendFile(__dirname + "/todoViews/todo.html");
});

// app.get("/login", function(req,res){
//   res.sendFile(__dirname + "/todoViews/login.html");
// });

// app.post("/login", function(req,res){
  
//   const email = req.body.email;
//   const password = req.body.password;
//   // if(username == "admin" && password == "123")
//   // {
//   //   req.session.isLoggedIn =true;
//   //   res.redirect('/');
//   //   return;
//   // }
//   // console.log(username,password);
//   readLoginData(function (err, data){
//       // console.log("Data",data);
//     if(err)
//      {
//       res.status(500).send("error");
//       return;
//     }
    
//     data.forEach(function (temp){
//       if(temp.email===email && temp.password===password ){
//         req.session.isLoggedIn =true;
//         res.render("index",{name: temp.username, email: temp.email, pass : temp.password, phone : temp.phone});
//         return;
//         }
//   });  
//   if(req.session.isLoggedIn !== true)
//   {
//     res.render('login', { msg : 'Invalid Credentials'});
//   }       
// });
// });

// app.get('/Logout',(req,res)=>{
//   req.session.isLoggedIn = false;
//   req.session.destroy();
//   res.redirect("/login");
// })

// app.get("/signup", function(req,res){
//   res.sendFile(__dirname + "/todoViews/signup.html");
// });

// app.post("/signup", function(req,res){
//   const email = req.body.email;
//   const username = req.body.username;
//   const phone = req.body.phone
//   const password = req.body.password;
//   let len1 = password.length;
//   let len2 = phone.length;
//   if(!email || !username || !password || len1 < 3 || len2 > 10 || len2 < 8){
//     res.render('signup',{msg: "Please Enter Valid Details", flag: true});
//   }
//   readLoginData(function (err, data){
//     // console.log("Data",data);
//   if(err)
//    {
//     res.status(500);
//     return;
//   }
//   let check = false;
//   data.forEach((elem)=>{
//     if((elem['email'] === email)){
//         check = true;
//         res.render('signup',{msg: "Email Already Registered", flag: true});
//     }
//   })
//     if(check === false)
//     {
//       saveLoginData(req.body, function (err) {
//         if (err) {
//           res.status(500).send("error");
//           return;
//         }
    
//         res.render('signup',{success: "Details Recorded Successfully", flag: false});
//         // res.redirect("/login");
//       });
//     }
//   });
// });
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
  // console.log(req.body);
  const id = parseInt(Math.random()*1000);
  const userInput = req.body.userInput;
  const profilePic = req.file;
  // console.log(profilePic)
  const data = {
    id : id,
    userInput: userInput,
    completeTask: false,
    profilePic: profilePic.filename,
    profilePath : profilePic.path
  }
  // console.log("Hello",data);
  saveTodoInFile(data, function (err) {
      // console.log(req.body);
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
// function readLoginData(callback) {
//   fs.readFile("./login.txt", "utf-8", function (err, data) {

//     if (err) {
//       // console.log("error");
//       callback(err);
//       return;
//     }

//     if (data.length === 0) {
//       data = "[]";
//     }

//     try {
//       // console.log("HELLO", data);

//       data = JSON.parse(data);
//       // console.log("HELLO error",);

//       callback(null, data);
//       // console.log("123456");

//     } catch (err) {
//       // console.log("HELLO error hbdcgibj");

//       callback(err);
//     }
//   });
// }
// function saveLoginData(details, callback) {
//   readLoginData(function (err, data) {
//     if (err) {
//       callback(err);
//       return;
//     }
//     const email = details.email;
//     const username = details.username;
//     const password = details.password;
//     const phone = details.phone
//     const newLoginData = {email,username, password, phone}
//     data.push(newLoginData);

//     fs.writeFile("./login.txt", JSON.stringify(data), function (err) {
//       if (err) {
//         callback(err);
//         return;
//       } 
//       callback(null);
//     });
//   });
// }

function saveTodoInFile(todo, callback) {
  readAllTodos(function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    // // const title = todo.userInput;
    // // const id = todo.id;
    // // const completeTask = todo.completeTask;
    // // const profilePic = todo.profilePic;
    // if(!title)
    // {
    //   return res.status(500).send("Title is required");
    // }
    // const todoText = title;
    // const newTodo = {todoText, profilePic}
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
    
    // console.log(data);
    let change = data.map(function(check){
      if(check.id == idToCheck){
        check.completeTask = req.body.check;
      }
      return check;
    });
    // console.log(change);

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
