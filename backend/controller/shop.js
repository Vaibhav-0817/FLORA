const express = require("express");
const path = require("path");
const router = express.Router();
const Shop = require("../model/shop");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { isSeller } = require("../middleware/auth");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const asyncError = require("../middleware/asyncError");
const sendShopToken = require('../utils/sendShopToken');
const cloudinary = require('cloudinary')

router.post("/create-shop", async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      return next(new ErrorHandler("Shop already exists", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });


    const seller = {
        name: req.body.name,
        email: email,
        password: req.body.password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
      };

      const activationToken = createActivationToken(seller);
      const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

      try {
        await sendMail({
          email: seller.email,
          subject: "Activate your Flora Seller Account",
          message: `Hi, ${seller.name} click on the given link to activate your Flora Seller account ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `Please check your Email to activate your Flora Seller account`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  } 
});

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};


router.post(
    "/activation",
    asyncError(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
        const newSeller = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  
        if (!newSeller) {
          return next(new ErrorHandler("invalid token", 400));
        }
        const { name, email, password, avatar, address, phoneNumber, zipCode } = newSeller;
  
        let seller = await Shop.findOne({ email })
        if (seller) {
          return next(new ErrorHandler("Shop already exists", 400));
        }
        seller = await Shop.create({
          name,
          email,
          password,
          avatar,
          address,
          phoneNumber,
          zipCode,
        });
        sendShopToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  
  router.post(
    "/lgn-seller",
    asyncError(async (req, res, next) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return next(new ErrorHandler("Please provide both fields", 400));
        }
        const seller = await Shop.findOne({ email }).select("password");
        if (!seller) {
          return next(new ErrorHandler("Seller doesn't exist", 400));
        }
        const isPassValid = await seller.comparePassword(password);
        if (!isPassValid) {
          return next(new ErrorHandler("Incorrect Credentials", 400));
        }
        sendShopToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.get(
    "/getSeller",
    isSeller,
    asyncError(async (req, res, next) => {
      try {
        const seller = await Shop.findById(req.seller.id);
        if (!seller) {
          return next(new ErrorHandler("User doesn't exist", 400));
        }
        res.status(200).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  
router.get(
  "/logout",
  isSeller,
  asyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log Out Successful",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-shop-info/:id",
  asyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-shop-avatar",
  isSeller,
  asyncError(async (req, res, next) => {
    try {
      const existsSeller = await Shop.findById(req.seller._id);

      const imageId = existsSeller.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      existsSeller.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };


    await existsSeller.save();
      res.status(200).json({
        success: true,
        seller: existsSeller
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-seller-info",
  isSeller,
  asyncError(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-shop-info/:id",
  asyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
