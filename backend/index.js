const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Product = require("./db/Product")
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const app = express();





app.use(express.json());

const PORT = 5000;

// function for

//cors act as a middleware
app.use(cors());
// creating API route
// for sending data to db
app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send("Something went wrong")  
        }
        res.send({result,auth:token})
    })
})


// API me data ko fetch karna hai
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      // 1para-->data to be send
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("Something went wrong");
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "No User found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
}),

  app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No Record Found." });
    }
  });

//except product id you can update anything in the product field
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});
// for finding the key according to given input
app.get("/search/:key",verifyToken,async(req,res)=>{
  let result=await Product.find({
    // when we are trying to search more than one field we use $or
    "$or":[
      {
        name:{$regex:req.params.key}
      },
      {
        company:{$regex:req.params.key}
      }
    ]
  });
  res.send(result)
})

// creating middleware

function verifyToken(req,res,next){
  const token=req.headers['authorization'];
  if(token){
    token=token.split('')[1];
    console.log("middleware called if ",token);
    Jwt.verify(token,jwtkey,(err,valid)=>{
      if(err){
res.status(401).send({result:"Please provide valid token"})
      }else{
next();
      }
    })
  }else{
res.status(403).send({result:"Please add token with header"})
  }
  
  
}


app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`));

// const express = require("express");
// require("./db/config");
// const User = require("./db/User");
// const app = express();
// const cors = require("cors");
// const PORT = 5000;

// app.use(express.json());
// app.use(cors());

// app.post("/register", async (req, res) => {
//   console.log("Inside register");
//   console.log(req.body);
//   let user = new User(req.body);
//   let result = await user.save();
//   res.send(result);
// });

// app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`));
