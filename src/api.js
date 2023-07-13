import { ProductsApiService } from "./api/ProductsApiService";
// import { Auth } from "./api/auth";

export const api = {
    products: new ProductsApiService,
    /* отключенная логика auth */
    // auth: new Auth,
};