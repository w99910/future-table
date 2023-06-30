import { FutureTable } from "future-table";

import "future-table/dist/style.css";

let futureTable = new FutureTable(document.getElementById("container"));

let data = [{name:'John', email:'john@mail.com','age':23},{name:'Mary', email:'mary@mail.com','age':23}]

futureTable.build(data);