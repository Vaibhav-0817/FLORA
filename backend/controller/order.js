const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const asyncError = require("../middleware/asyncError");
const { isSeller } = require("../middleware/auth");
const Order = require("../model/order");
const Product = require("../model/product");

router.post(
    "/create-order",
    asyncError(async (req, res, next) => {
      try {
        const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
  
        const shopItemsMap = new Map();
  
        for (const item of cart) {
          const shopId = item.shopId;
          if (!shopItemsMap.has(shopId)) {
            shopItemsMap.set(shopId, []);
          }
          shopItemsMap.get(shopId).push(item);
        }
  
        const orders = [];
  
        for (const [shopId, items] of shopItemsMap) {
          const order = await Order.create({
            cart: items,
            shippingAddress,
            user,
            totalPrice,
            paymentInfo,
          });
          orders.push(order);
        }
  
        res.status(201).json({
          success: true,
          orders,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.get(
    "/get-all-orders/:userId",
    asyncError(async (req, res, next) => {
      try {
        const orders = await Order.find({ "user._id": req.params.userId }).sort({
          createdAt: -1,
        });
  
        res.status(200).json({
          success: true,
          orders,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.get(
    "/get-seller-all-orders/:shopId",
    asyncError(async (req, res, next) => {
      try {
        const orders = await Order.find({
          "cart.shopId": req.params.shopId,
        }).sort({
          createdAt: -1,
        });
  
        res.status(200).json({
          success: true,
          orders,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.get(
    "/get-seller-all-orders/:shopId",
    asyncError(async (req, res, next) => {
      try {
        const orders = await Order.find({
          "cart.shopId": req.params.shopId,
        }).sort({
          createdAt: -1,
        });
  
        res.status(200).json({
          success: true,
          orders,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.put(
    "/update-order-status/:id",
    isSeller,
    asyncError(async (req, res, next) => {
      try {
        const order = await Order.findById(req.params.id);
  
        if (!order) {
          return next(new ErrorHandler("Order not found with this id", 400));
        }
        if (req.body.status === "Transferred to delivery partner") {
          order.cart.forEach(async (o) => {
            await updateOrder(o._id, o.qty);
          });
        }
  
        order.status = req.body.status;
  
        if (req.body.status === "Delivered") {
          order.deliveredAt = Date.now();
          order.paymentInfo.status = "Succeeded";
        }
  
        await order.save({ validateBeforeSave: false });
  
        res.status(200).json({
          success: true,
          order,
        });
  
        async function updateOrder(id, qty) {
          const product = await Product.findById(id);
  
          product.stock -= qty;
          product.sold_out += qty;
  
          await product.save({ validateBeforeSave: false });
        }
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.put(
    "/order-refund/:id",
    asyncError(async (req, res, next) => {
      try {
        const order = await Order.findById(req.params.id);
  
        if (!order) {
          return next(new ErrorHandler("Order not found with this id", 400));
        }
  
        order.status = req.body.status;
  
        await order.save({ validateBeforeSave: false });
  
        res.status(200).json({
          success: true,
          order,
          message: "Return Request Successfully Created!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.put(
    "/order-refund-success/:id",
    isSeller,
    asyncError(async (req, res, next) => {
      try {
        const order = await Order.findById(req.params.id);
  
        if (!order) {
          return next(new ErrorHandler("Order not found with this id", 400));
        }
  
        order.status = req.body.status;
  
        await order.save();
  
        res.status(200).json({
          success: true,
          message: "Order Refund successfull!",
        });
  
        if (req.body.status === "Refund Success") {
          order.cart.forEach(async (o) => {
            await updateOrder(o._id, o.qty);
          });
        }
  
        async function updateOrder(id, qty) {
          const product = await Product.findById(id);
  
          product.stock += qty;
          product.sold_out -= qty;
  
          await product.save({ validateBeforeSave: false });
        }
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  module.exports = router;