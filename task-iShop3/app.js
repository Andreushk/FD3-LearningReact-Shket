/* Подключение React */
import React from "react";
import ReactDOM from "react-dom";

/* Общие стили */
import style from "./css/style.css";

/* Компонент Catalog */
import {Catalog} from "./components/Catalog.js";

/* Данные для таблицы */
const shopName = "iShop";
import data from "./data/product-data.json";

/* Рендер блока с таблицей товаров */
ReactDOM.render(
  <Catalog shopName={shopName} data={data} />,
  document.querySelector(".wrapper")
);