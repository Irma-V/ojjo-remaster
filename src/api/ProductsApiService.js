import { BaseApiService } from "./BaseApiService";

export class ProductsApiService extends BaseApiService {
  async getProducts(data = {}) {
    let fullUrl = `${this.baseUrl}/products?`;

    for (const [key, value] of Object.entries(data)) {
      fullUrl = fullUrl + key + "=" + value + "&";
    }

    return await fetch(fullUrl).then((result) => {
      return result.json();
    });
  }
  
  async getProductById(productId) {
    this.getProducts();
    return await fetch(`${this.baseUrl}/products/` + productId).then(
      (result) => {
        return result.json();
      }
    );
  }

  async getAllProducts() {
    const array = await this.getProducts({ limit: 100 });
    for (let item in array) {
      let allProducts = array[item];
      // console.log(allProducts);
      return allProducts;
    }
  }

  async getSearchProducts(anything) {
    return await fetch(`${this.baseUrl}/products/search?q=`+anything).then(
      (result) => {
        return result.json();
      }
    );
  }

  async getProperties(products, key) {
    let result = products.map((product) => product[key]);
    return result;
  }
}
