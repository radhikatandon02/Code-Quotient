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






app.get("/login", function(req,res){
  res.sendFile(__dirname + "/todoViews/login.html");
});

app.post("/login", function(req,res){
  
  const email = req.body.email;
  const password = req.body.password;
  
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
        res.render("index",{name: temp.username, email: temp.email, pass : temp.password, phone : temp.phone});
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
  const phone = req.body.phone
  const password = req.body.password;
  let len1 = password.length;
  let len2 = phone.length;
  if(!email || !username || !password || len1 < 3 || len2 > 10 || len2 < 8){
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


app.get("/todoScript", function (req, res) {
  res.sendFile(__dirname + "/todoViews/scripts/todoScript.js");
});



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
    const phone = details.phone
    const newLoginData = {email,username, password, phone}
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

app.listen(3000, function () {
  console.log("server on port 3000");
});
