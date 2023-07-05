"use strict";

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

import {GoodsTable} from "./components/goods-table";
import data from "./products-data/products-data.json";

const shopName = "iShop";

ReactDOM.render(
  React.createElement(GoodsTable, {shopName: shopName, dataDefault: data}),
  document.querySelector(".wrapper")
);