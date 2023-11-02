
console.log("backend") ;
// 

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// // mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect('mongodb+srv://aniketkumarchauhan04:Un0ovVfrKr9MzCwN@cluster0.dcq2rvm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

// // schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  image: String,
});

// //
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

// //sign up
// app.post("/signup", async (req, res) => {
//   console.log(req.body);
//   const { email,firstName,lastName,password } = req.body;

//   userModel.findOne({ email: email }, (err, result) => {
//     console.log(result);
//     console.log(err);
//     if (result) {
//       res.status(400).json({ message: "Email id is already register", alert: false });
//     } 
//     else {
//       const data = userModel(req.body);
//       const save = data.save();
//       res.status(201).json({ message: "Successfully sign up", alert: true });
//     }
//   });
// });



//sign up
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email} = req.body;

  const result = await userModel.findOne({ email: email })
    if (result) {
      res.status(400).json({ message: "Email id is already register", alert: false });
    } 
    else {
      const data = userModel(req.body);
      const save = data.save();
      res.status(201).json({ message: "Successfully sign up", alert: true });
    }
});



// //api login
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) 
    {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } 
    else 
    {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});









// //product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)



//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    console.log(data)
    const datasave = await data.save()
    res.send({message : "Upload successfully" , data:datasave})
})

// //
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})
 
// /*****payment getWay */
// console.log(process.env.STRIPE_SECRET_KEY)


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const lineItems = req.body.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          // images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
      quantity: item.qty,
    }));

    const sessionParams = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1N0qDnSAq8kJSdzMvlVkJdua" }],
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});
app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // You can implement email sending or store the message in a database here

  // For now, let's just log the received message
  console.log(`Received message from ${name} (${email}): ${message}`);

  res.json({ success: true, message: 'Message received successfully!' });
});



//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));











