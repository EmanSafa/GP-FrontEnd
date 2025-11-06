import axiosInstance  from "./axiosInstance";
import endpoints from "./endpoints";


export const authApi = {
  login: (data: unknown) => axiosInstance.post(endpoints.auth.login, data),
};

export const productsApi = {
  list:( ) => axiosInstance.get(endpoints.products.list),
    categories: () => axiosInstance.get(endpoints.products.categories),
    brands: () => axiosInstance.get(endpoints.products.brands),
};

export const cartApi = {
  items: () => axiosInstance.get(endpoints.cart.items)
};


