/* import React */
import React from "react";
import ReactDOM from "react-dom";

/* import data about clients */
import clientsData from "./data/customers-data.json"; 

/* import style */
import "./style.css";

/* import necessary components */
import {ClientsTableBlock} from "./components/ClientsTableBlock/ClientsTableBlock.jsx";


ReactDOM.render(
  <ClientsTableBlock clientsData={clientsData} />,
  document.querySelector(".wrapper")
);