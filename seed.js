// Handy project Unterricht, Mansour, dabei simple html frontend.... check

import mongoose from "mongoose";
import Product from "./models/Product.js";
import connect from "./libs/db.js";


// array v objects; products array : smartphone

//{ name: 'Samsung Galaxy S21 Ultra', price: 1249, category: 'smartphone' },


const colors = ["Black", "White", "Silver", "Gold", "Blue", "Green", "Purple", "Red"];
  const brands = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus", "Sony", "Huawei", "Motorola"];
  const features = [
    "128GB Storage",
    "256GB Storage",
    "5G Connectivity",
    "AMOLED Display",
    "Triple Camera",
    "Face ID",
    "In-display Fingerprint Scanner",
    "Wireless Charging"
];

const productsArr = [];
for (let i = 0; i < 300; i++) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const feature = features[Math.floor(Math.random() * features.length)];
  const name = `${color} ${brand} Smartphone with features incl. ${feature}`;   
  const price = Math.floor(Math.random() * 1000) + 500;   
  // wenn es nur darum geht, keine dezimale Zahlen zu haben, dann kann man auch parseInt verwenden

    productsArr.push({ name, price});
  }; 
//  console.log(productsArr[0]);
console.log(productsArr.slice(0, 2));

connect();
seed()
async function seed() {

  const products = await Product.insertMany(productsArr);
  console.log(products.length, 'products seeded' );
  process.exit();
}
//   

