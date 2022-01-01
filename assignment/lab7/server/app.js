const express = require('express');
const app = express();  //create an instance of express
const configRoutes = require('./routes');  //configue routes
const cors = require('cors');  // ❤ for CORS policy

app.use(cors());  // ❤ for CORS policy
app.use(express.json());  //❤ allow us to read the request body. Without this line, if you try to read request body, it will be undefined

configRoutes(app);

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001/pokemon/page/0');
});