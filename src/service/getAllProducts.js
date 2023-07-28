import { api } from "@/api.js";
import { addProductsForApi } from "@/database-mock";
import store from "@/store";

const DBMockProducts = addProductsForApi;

export const generateAllProducts = async function () {
  let allProducts = [];
  const apiProducts = [];

  return await api.products.getProducts({ limit: 100 }).then((res) => {
    apiProducts.push(...res.products);

    /* массив allProducts с полученными продуктами из АПИ и файла Database-mock*/
    // allProducts = [...apiProducts];
    // allProducts = [...apiProducts, ...DBMockProducts];
    allProducts = [...DBMockProducts];
    return allProducts;
  });

  //   console.log(allProducts);
};

// export const getProducts = async function (filters) {
//   return await generateAllProducts().then((result) => {
//     let newResult = result;
//     //  newResult = result.filter((product) => {
//     //   //   todo добавить остальные фильтры
//     //   })
//     if (filters.category) {
//       newResult = newResult.filter((product) => {
//         return product.category === filters.category;
//       });
//     }

//     if (filters.moreFilters !== []) {
//       newResult = newResult.filter((product) => {
//         let isValid = true;
//         for (let i in filters.moreFilters) {
//           //   console.log();
//           if (
//             product[filters.moreFilters[i].key] === filters.moreFilters[i].value
//           ) {
//             continue;
//           }
//           isValid = false;
//           break;
//         }
//         return isValid;
//       });
//       //   console.log(newResult);
//     }
//     // console.log( 'полученные данные', newResult);
//     let count = newResult.length;
//     newResult = newResult.slice(filters.offset, filters.limit);
//     // console.log( 'полученный данные с учетом лимита', newResult);
//     return {
//       count: count,
//       result: newResult,
//     };
//   });
// };

export function getProducts (products,filters) {
    
      let newResult = products;
      console.log(newResult);
      //  newResult = result.filter((product) => {
      //   //   todo добавить остальные фильтры
      //   })
      if (filters.category) {
        newResult = newResult.filter((product) => {
          return product.category === filters.category;
        });
      }
  
      if (filters.moreFilters !== []) {
        newResult = newResult.filter((product) => {
          let isValid = true;
          for (let i in filters.moreFilters) {
            //   console.log();
            if (
              product[filters.moreFilters[i].key] === filters.moreFilters[i].value
            ) {
              continue;
            }
            isValid = false;
            break;
          }
          return isValid;
        });
        //   console.log(newResult);
      }
      // console.log( 'полученные данные', newResult);
      let count = newResult.length;
      newResult = newResult.slice(filters.offset, filters.limit);
      // console.log( 'полученный данные с учетом лимита', newResult);
      return {
        count: count,
        result: newResult,
      };
    
  };