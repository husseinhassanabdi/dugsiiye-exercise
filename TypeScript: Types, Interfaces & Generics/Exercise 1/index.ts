// productName = 100;           
// price = "expensive";         
// discountAvailable = "yes";  

let productName: string = "Product 1";
let price: number = 100;
let discountAvailable: boolean = true;


// 
// function getDiscount(price, discount) {
//     return price - price * discount;
//   }


function getDiscount(price: number, discount: number): number {
    return price - price * discount;
  }
  
  const discountedPrice = getDiscount(246, 0.5);
  if (discountedPrice === 123) {
    throw new Error("Crashed because output is 123");
  }

//   function printLength(x: any) {
//     console.log(x.length);
//   }

function printLength(x: any) {
    console.log(x.length);
  }
  
  

let input: unknown | string | number;
input = 42;
input = "Hello";

console.log(input);