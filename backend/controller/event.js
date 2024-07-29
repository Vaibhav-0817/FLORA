const express = require('express')
const asyncError = require('../middleware/asyncError')
const Shop = require('../model/shop')
const Event = require('../model/event')
const router = express.Router()
const ErrorHandler = require('../utils/ErrorHandler')
const {isSeller} = require('../middleware/auth')
const cloudinary = require("cloudinary");


router.post(
    "/create-event",
    asyncError(async (req, res, next) => {
      try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
          return next(new ErrorHandler("shop id is invalid", 400));
        } else {
          let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
          const eventData = req.body;
          eventData.images = imagesLinks;
          eventData.shop = shop;
  
          const event = await Event.create(eventData);
  
          res.status(201).json({
            success: true,
            event,
          });
        }
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

  
router.get('/get-all-events/:id',asyncError(async(req,res,next)=>{
  try {
    const events = await Event.find({shopId: req.params.id})
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}))

router.delete('/delete-shop-event/:id', isSeller, asyncError(async(req,res,next)=>{
  try {
    const productId = req.params.id
    const event = await Event.findByIdAndDelete(productId)

    if(!event){
      return next(new ErrorHandler("no product with this id found",500))
    }
    res.status(201).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}))

router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

  module.exports = router