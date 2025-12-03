export const endpoints = {
  auth: {
    register: "/register",
    login: "/login",
    logout: "/logout",
    resetPassword: "password/reset",
  },
  products: {
    list: "/products",
    detail: (id: number) => `/products/${id}`,
    images: (id: number) => `/products/${id}/images`,
    imageDelete: (id: number) => `/products/images/${id}`,
    imagesReplace: (id: number) => `/products/${id}/images/replace`,
    singleProduct: (id: number) => `/products/${id}`,
    singleProductImages: (id: number) => `/products/${id}/images`,
    // categories and brands are not explicitly in the paths but mentioned in the NOTE
    categories: "/categories",
    brands: "/brands",
  },
  cart: {
    items: "/cart",
    add: "/cart/add",
    total: "/cart/total",
    count: "/cart/count",
    update: (id: number) => `/cart/items/${id}`,
    remove: (id: number) => `/cart/items/${id}`,
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
    detail: (id: number) => `/categories/${id}/products`,
  },
  brands: {
    list: "/brands",
    detail: (id: number) => `/brands/${id}/products`,
  },
  user: {
    update: (id: number) => `/user/${id}`,
    profile: (id: number) => `/user/${id}`,
    orders: (id: number) => `/users/${id}/orders`,
    reviews: (id: number) => `/users/${id}/reviews`,
  },
  search: {
    query: `/products/search`,
  },
  test: {
    public: "/test/public",
    protected: "/test/protected",
    admin: "/test/admin",
    session: "/test/session",
    ownership: (id: number) => `/test/ownership/${id}`,
  },
};

export default endpoints;
