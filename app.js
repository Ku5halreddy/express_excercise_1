// require the express module
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// create an object from the express function which we contains methods for making requests and starting the server
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());
const itemRoutes = require("./routes/shoppinglist");
const { response } = require("express");

app.use("/items",itemRoutes);
app.get("/", function(request, response) {
  
  return response.send("Hello World!");
});

// app.get("/instructor/:firstName", function(request, response) {
//     // let's capture the "dynamic" part of the URL, which we have called "firstName". The name that we give to this dynamic part of the URL will become a key in the params object, which exists on the request object. 
//     // let's send back some text with whatever data came in the URL!
//     return response.send(
//       `The name of this instructor is ${request.params.firstName}`
//     );
//   });

  app.get("/secret", (req, res,next) => {
    //res.status(401).json({ message: "Unauthorized" });
        const error=new Error('Unauthorized');
        error.status=400;
        return next(error);
  });

  app.use((err,req,res,next)=>{
      //res.status(err.status||500);
     // return res.send(err.message).status(err.status);
     return res.json({
        message: err.message,
        /*
         if we're in development mode, include stack trace (full error object)
         otherwise, it's an empty object so the user doesn't see all of that
        */
       status:err.status,
      }).status(err.status);
  });
  
// let's tell our server to listen on port 3000 and when the server starts, run a callback function that console.log's a message
app.listen(3000, function() {
  console.log(
    "The server has started on port 3000. Head to localhost:3000 in the browser and see what's there!"
  );
});