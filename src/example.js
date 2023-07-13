export function isNull(val){
  return val === null;
}

export function isUndefined(val) {
  return val === undefined;
}

export function isNullOrUndefined(val) {
  return isNull(val) || isUndefined(val);
}

// function hello(argument1, argument2) {
//   return argument1 + argument2;
// }

// const hello = (argument1, argument2) => {
//   argument1 + argument2;
// };

// const tags = [
//   {
//     id: 1,
//   },
//   {
//     id: 2,
//   },
// ];

// // const condition = (tag) => { tag.id === 1 }

// const filteredTags = tags.every(condition);

// let resultArray = [];
// for (let i = 0; i < tags.length; i++) {
//   let ok = condition(tags[i]);
//   if (!ok) {
//     // return false
//     continue;
//   }
// }

// // return resultArray;

// console.log(resultArray);

// // function notFilter(anyFunction) {
// //     anyFunction
// // };

// // notFilter(function(tag) {
// //     return tag.id === 1;
// // })

// // const aas = {
// //     a: 1,
// //     b: 2,
// //     c: 3,
// // }
// // const { a, b, c } = aas;

// // let title = options.title
// // let width = options.width
// // let

// function ex1() {}

// function addItem(itemId) {}

// function asd() {
//   const condition = (tag) => {
//     tag.id === 1;
//   };
//   const filteredTags = tags.every(condition);
// }

// let primer1 = 6;
// let primer2 = undefined;

// function umnozhaem(a, b) {
//   return a * b;
// }

// umnozhaem(primer1, primer2);

// let string = "Вася";
// string = "Петя";

// let array = [1, 2, 3, 54, 65];
// array.push(6);
// array = "Жора";
// array = [4553, 5, 2, 34];

// class Rectangle {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
// }

// class Basket {
//   products = [];
//   discount = 0.25;

//   count() {
//     return this.products.length;
//   }

//   acceptDiscount() {}
// }

// let basket = new Basket();
// (basket.discount = 0), 5;

// class Calculator {
//   umnozhaem(a, b) {
//     return a * b;
//   }
// }

// let calcutaor = new Calculator();
// calcutaor.umnozhaem(5, 6);

// class Object {}

// let person = new Object();

// person.name = "Rohan";
// person.age = 35;

// console.log(person);

// delete person.age;
// console.log(person);

// const zhopa = 1;
// zhopa = 2;

// const zhopa1 = [1];
// zhopa1.push(2);
// zhopa1 = [1, 4, 23];

// const human = {
//   name: "sfgsdfsdf",
//   last_name: "dfgdfgd",
// };

// human.name = "aaaaaaa";
// console.log(human.name); // aaaaaaa
// Object.freeze(human);

// let aboba = "Петя";
// let a = 4;
// switch (a) {
//   case 1:
//     aboba = "Васельки";
//     break;
//   case 2:
//     aboba = "Петушки";
//     break;

//   case 3:
//     break;
// }
// aboba;

// file2().calculate();

// class Product {
//   title = "";
//   price = 0;
// }

// // function constructor Vendor {
// //     title = 'Сваровски'
// // }

// class Vendor {
//   title = "Сваровски";
// }

// const vendor = new Vendor();
// const firstProduct = new Product();
// firstProduct.price = 15;
// firstProduct.title = "Серьга доче xабана";
// firstProduct.vendor = vendor;

// const secondProduct = Object.assign(firstProduct);
// // console.log(secondProduct)
// // JSON.parse(JSON.stringify(firstProduct))

// // const secondProduct = new Product()
// secondProduct.price = 15;
// secondProduct.title = "Серьга доче xабана зелёный";
// secondProduct.vendor = vendor;

// // exampleObj.products = [1,4,32,234]

// const products = [firstProduct, secondProduct];

// for (let i = 0; i < products.length; i++) {
//   products[i].vendor.title += " наш";
// }

// const foo = (function () {})();

// let array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// // let resultArray = [];
// // array.forEach(function(arrayItem) {
// //     if (arrayItem > 4) {
// //         resultArray.push(arrayItem)
// //     }
// // })

// let resultArray1 = array.map(function (arrayItem) {
//   if (arrayItem > 4) {
//     return arrayItem + 1;
//   }
//   return 0;
// });

// let first = 5;
// let second = "5";

// first === second;

// this.window.zhopa = 1;

// // debugger
