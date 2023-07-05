"use strict";

import React from "react";
import ReactDOM from "react-dom";

import GoodsTable from "./components/goods-table.js";

import data from "./products-data/products-data.json" assert {type: "json"};

const shopName = "iShop";

ReactDOM.render(
  React.createElement(GoodsTable, {shopName: shopName, dataDefault: data}),
  document.querySelector(".wrapper")
);