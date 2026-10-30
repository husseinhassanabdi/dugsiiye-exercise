"use strict";


// productName = 100;           
// price = "expensive";         
// discountAvailable = "yes";  


let productName = "Product 1";
let price = 100;
let discountAvailable = true;



// 
// function getDiscount(price, discount) {
//     return price - price * discount;
//   }
function getDiscount(price, discount) {
    return price - price * discount;
}
const discountedPrice = getDiscount(246, 0.5);
if (discountedPrice === 123) {
    throw new Error("Crashed because output is 123");
}
let input;
input = 42;
input = "Hello";
console.log(input);
