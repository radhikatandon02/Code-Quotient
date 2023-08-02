const express = require("express");
const fs = require("fs");
var session = require('express-session')

const app = express();

app.use(session({
  secret: 'shushradzz',
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", function (req, res) {
  if(!req.session.isLoggedIn){
    res.redirect('/login');
    return;
  }
  // const userName = req.query.user;
  // res.render('index', { name : userName });
  res.sendFile(__dirname + "/todoViews/index.html");
});




// app.get("/about", function (req, res) {
//   if(!req.session.isLoggedIn){
//     res.redirect('/login');
//     return;
//   }
//   res.sendFile(__dirname + "/todoViews/about.html");
// });

// app.get("/contact", function (req, res) {
//   if(!req.session.isLoggedIn){
//     res.redirect('/login');
//     return;
//   }
//   res.sendFile(__dirname + "/todoViews/contact.html");
// });

// app.get("/todo", function (req, res) {
//   if(!req.session.isLoggedIn){
//     res.redirect('/login');
//     return;
//   }
//   res.sendFile(__dirname + "/todoViews/todo.html");
// });

app.get("/login", function(req,res){
  res.sendFile(__dirname + "/todoViews/login.html");
});

app.post("/login", function(req,res){
  
  const email = req.body.email;
  const password = req.body.password;
  // if(username == "admin" && password == "123")
  // {
  //   req.session.isLoggedIn =true;
  //   res.redirect('/');
  //   return;
  // }
  // console.log(username,password);
  readLoginData(function (err, data){
      // console.log("Data",data);
    if(err)
     {
      res.status(500).send("error");
      return;
    }
    
    data.forEach(function (temp){
      if(temp.email===email && temp.password===password ){
        req.session.isLoggedIn =true;
        res.render("index",{name: temp.username});
        return;
        }
  });  
  if(req.session.isLoggedIn !== true)
  {
    res.render('login', { msg : 'Invalid Credentials'});
  }       
});
});

app.get('/Logout',(req,res)=>{
  req.session.isLoggedIn = false;
  req.session.destroy();
  res.redirect("/login");
})

app.get("/signup", function(req,res){
  res.sendFile(__dirname + "/todoViews/signup.html");
});

app.post("/signup", function(req,res){
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  let len = password.length;
  if(!email || !username || !password || len < 3){
    res.render('signup',{msg: "Please Enter Valid Details", flag: true});
  }
  readLoginData(function (err, data){
    // console.log("Data",data);
  if(err)
   {
    res.status(500);
    return;
  }
  let check = false;
  data.forEach((elem)=>{
    if((elem['email'] === email)){
        check = true;
        res.render('signup',{msg: "Email Already Registered", flag: true});
    }
  })
    if(check === false)
    {
      saveLoginData(req.body, function (err) {
        if (err) {
          res.status(500).send("error");
          return;
        }
    
        res.render('signup',{success: "Details Recorded Successfully", flag: false});
        // res.redirect("/login");
      });
    }
  });
});
// app.get("/todo-data", function (req, res) {
//   readAllTodos(function (err, data) {
//     if (err) {
//       res.status(500).send("error");
//       return;
//     }
//     //res.status(200).send(JSON.stringify(data));
//     res.status(200).json(data);
//   });
// });

// app.post("/todo", function (req, res) {
//   // console.log(req.body);
//   saveTodoInFile(req.body, function (err) {
//     if (err) {
//       res.status(500).send("error");
//       return;
//     }

//     res.status(200).send("success");
//   });
// });

app.get("/todoScript", function (req, res) {
  res.sendFile(__dirname + "/todoViews/scripts/todoScript.js");
});


// function readAllTodos(callback) {
//   fs.readFile("./treasure.txt", "utf-8", function (err, data) {
//     if (err) {
//       callback(err);
//       return;
//     }

//     if (data.length === 0) {
//       data = "[]";
//     }

//     try {
//       data = JSON.parse(data);
//       callback(null, data);
//     } catch (err) {
//       callback(err);
//     }
//   });
// }
function readLoginData(callback) {
  fs.readFile("./login.txt", "utf-8", function (err, data) {

    if (err) {
      // console.log("error");
      callback(err);
      return;
    }

    if (data.length === 0) {
      data = "[]";
    }

    try {
      // console.log("HELLO", data);

      data = JSON.parse(data);
      // console.log("HELLO error",);

      callback(null, data);
      // console.log("123456");

    } catch (err) {
      // console.log("HELLO error hbdcgibj");

      callback(err);
    }
  });
}
function saveLoginData(details, callback) {
  readLoginData(function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    const email = details.email;
    const username = details.username;
    const password = details.password;
    
    const newLoginData = {email,username, password}
    data.push(newLoginData);

    fs.writeFile("./login.txt", JSON.stringify(data), function (err) {
      if (err) {
        callback(err);
        return;
      } 
      callback(null);
    });
  });
}

// function saveTodoInFile(todo, callback) {
//   readAllTodos(function (err, data) {
//     if (err) {
//       callback(err);
//       return;
//     }
//     const title = todo.todoText;
//     const id = todo.id;
//     const completeTask = todo.completeTask;
//     if(!title)
//     {
//       return res.status(500).send("Title is required");
//     }
//     const todoText = title;
//     const newTodo = {id,todoText, completeTask}
//     data.push(newTodo);

//     fs.writeFile("./treasure.txt", JSON.stringify(data), function (err) {
//       if (err) {
//         callback(err);
//         return;
//       } 
//       callback(null);
//     });
//   });
// }


// app.delete('/todo/:id',(req,res) =>{
//   readAllTodos(function (err, data) {
//     if (err) {
//       callback(err);
//       return;
//     }
    
//     const idToDelete = parseInt(req.params.id);
//     const todo = data.filter(({id}) => id !== idToDelete);
    
//     fs.writeFile("./treasure.txt", JSON.stringify(todo), function (err) {
//       if (err) {
//         res.status(500).send("error");
//         return;
//       } 

//     });
//     res.status(200).send("success");
//   });
// });

// app.patch('/check/:id', (req,res)=>{
//   const idToCheck = req.params.id;
//   readAllTodos(function (err, data) {
//     if (err) {
//       callback(err);
//       return;
//     }
    
//     // console.log(data);
//     let change = data.map(function(check){
//       if(check.id == idToCheck){
//         check.completeTask = req.body.check;
//       }
//       return check;
//     });
//     // console.log(change);

//     fs.writeFile("./treasure.txt", JSON.stringify(change), function (err) {
//       if (err) {
//         res.status(500).send("error");
//         return;
//       } 
//     });
//     res.status(200).send("success");
//   })
// });
app.listen(3000, function () {
  console.log("server on port 3000");
});
