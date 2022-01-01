const express = require('express');
const app = express();
const configRoutes = require('./routes');  // configure routes
const bcrypt = require('bcryptjs');  // other version by using 'bcryptjs'
const saltRounds = 10;  //the higher number, the longer time wil be 

const session = require('express-session');  // https://www.npmjs.com/package/express-session
app.use('/public', express.static(__dirname + '/public'));  // tell app to use the /public directory as static. Without this, /public/css/main.css will not have effect
app.use(express.json());  //❤ allow us to read the request body. Without this line, if you try to read request body, it will be undefined
app.use(express.urlencoded({ extended: true }));  // get form data
app.use(async (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  // let the next middleware run:
  next();
});

app.use(session({
  name: 'Build Session',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

// Middleware
const data = require('./data');
const blogData = data.blogs;
const commentData = data.comments;
const userData = data.users;

// One which verify whether user is authenticated
app.use('/blog/login', async (req, res, next) => {
  if (req.session.isLogIn) {
    next();
  } else {
    const { username, password } = req.body;

    try {
      const loginUser = await userData.getUserByUserName(username);
      let match = await bcrypt.compare(password, loginUser.password);  // validate the correct password
      if (match) {
        req.session.isLogIn = true;
        req.session.user = {
          _id: loginUser._id,
          name: loginUser.name,
          username: loginUser.username,
          password: loginUser.password
        };
        res.cookie('AuthUser');
      } else {
        req.session.isLogIn = false;
      }
    } catch (e) {
      console.log("Middleware app.use('/blog/login') HAS ERROR!");
      return;
    }
    next();
  }
})


// middleware that will be applied to the POST, PUT and PATCH routes for the /blog endpoint 
app.use('/blog/:id', async (req, res, next) => {
  console.log(req.params);
  if (req.params.id === 'signup' || req.session.isLogIn) {
    next();
  } else {
    res.status(403).json({ error: "403: Forbidden" });
    // res.status(403).redirect('blog/login');
  }
})


// middleware that will be applied to the POST and DELETE routes for the /blog/:id/comments and /blog/:blogId/:commentId endpoints
app.use('/blog/:id/comments', async (req, res, next) => {
  if (req.session.isLogIn) {
    next();
  } else {
    res.status(403).json({ error: "403: Forbidden" });
    // res.status(403).redirect('blog/login');
  }
})

app.use('/blog/:blogId/:commentId', async (req, res, next) => {
  if (req.session.isLogIn) {
    next();
  } else {
    res.status(403).json({ error: "403: Forbidden" });
    // res.status(403).redirect('blog/login');
  }
})


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});