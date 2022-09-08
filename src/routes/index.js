const express = require("express");
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
const productRoute = require("./product.route");
const eventRoute = require("./event.route");
const blogRoute = require("./blog.route");
const bookingRoute = require("./booking.route");
const tableRoute = require("./table.route");
const categoryRoute = require("./category.route");
const chatRoute = require("./chat.route");
const slotRoute = require("./slot.route");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/event",
    route: eventRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/booking",
    route: bookingRoute,
  },
  {
    path: "/table",
    route: tableRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/chatConnection",
    route: chatRoute,
  },
  {
    path: "/slot",
    route: slotRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
