

export const endpoints = {
  auth: {
    register: "/register",
    login: "/login",
    logout: "/logout",
    resetPassword: 'password/reset'
  },
  products: {
    list: "/products",
    detail: (id: number) => `/products/${id}`,
    images: (id: number) => `/products/${id}/images`,
    imageDelete: (id: number) => `/products/images/${id}`,
    imagesReplace: (id: number) => `/products/${id}/images/replace`,
    // categories and brands are not explicitly in the paths but mentioned in the NOTE
    categories: "/categories", 
    brands: "/brands",
  },
  cart: {
    items: "/cart",
    add: "/cart",
    update: (id: number) => `/cart/${id}`,
    remove: (id: number) => `/cart/${id}`,
    clear: "/cart/clear", // Inferred
  },
  orders: {
    list: "/orders",
    detail: (id: number) => `/orders/${id}`,
    create: "/orders",
  },
  reviews: {
    list: "/reviews",
    create: "/reviews",
    delete: (id: number) => `/reviews/${id}`,
  },
  categories: {
    list: "/categories",
    detail: (id: number) => `/categories/${id}`,
  },
  brands: {
    list: "/brands",
    detail: (id: number) => `/brands/${id}`,
  },
  user: {
    profile: "/user",
    update: "/user",
  },
  search: {
    query: "/search",
  },
  test: {
    ping: "/test",
  },
};

export default endpoints;
