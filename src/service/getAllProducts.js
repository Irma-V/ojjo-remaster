import { api } from "@/api.js";
import { addProductsForApi } from "@/database-mock";

const DBMockProducts = addProductsForApi;

export const generateAllProducts = async function () {
  let allProducts = [];
  const apiProducts = [];

  return await api.products.getProducts({ limit: 100 }).then((res) => {
    apiProducts.push(...res.products);

    allProducts = [...apiProducts, ...DBMockProducts];
    return allProducts;
  });
  // console.log(allProducts);
};

export const getProducts = async function (filters) {
  return await generateAllProducts().then((result) => {
    let newResult = result;

    //  newResult = result.filter((product) => {
    //   //   todo добавить остальные фильтры
    //   })

    if (filters.category) {
      newResult = newResult.filter((product) => {
        return product.category === filters.category;
      });
    }

    newResult = newResult.slice(filters.offset, filters.limit);
    return newResult;
  });
};