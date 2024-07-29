const express = require("express");
const app = express();
const ErrorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(cors({
  origin: 'https://flora-frontend-g2yg.onrender.com',
  credentials: true,
}));
app.use(express.json({limit: '5mb'}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use("/",express.static("./uploads"));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
//import routes
const user = require("./controller/user");
const shop = require('./controller/shop');
const product = require('./controller/product')
const event = require('./controller/event')
const coupon = require('./controller/couponCode')
const payment = require('./controller/payment');
const order = require("./controller/order");
const conversation = require('./controller/conversation')
const messages = require('./controller/messages')
app.use("/api/user",user);
app.use('/api/shop',shop);
app.use('/api/product',product)
app.use('/api/event',event)
app.use('/api/coupon',coupon)
app.use('/api/payment',payment)
app.use('/api/order',order)
app.use("/api/conversation",conversation);
app.use("/api/messages",messages);
//for error handling
app.use(ErrorHandler);

module.exports = app;
