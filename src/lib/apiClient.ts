import type {
  AddCartItemData,
  CheckoutData,
  ReivewData,
  UpdateUserProfileRequest,
} from "@/types/types";
import axiosInstance from "./axiosInstance";
import endpoints from "./endpoints";

export const authApi = {
  register: (data: { email: string; password: string; name: string }) =>
    axiosInstance.post(endpoints.auth.register, data),
  login: (data: { email: string; password: string }) =>
    axiosInstance.post(endpoints.auth.login, data, { withCredentials: true }),
  logout: () => axiosInstance.post(endpoints.auth.logout),
  resetPassword: (data: { email: string; newPass: string }) =>
    axiosInstance.post(endpoints.auth.resetPassword, data),
};

export const productsApi = {
  list: (params?: any) =>
    axiosInstance.get(endpoints.products.list, { params }),
  getById: (id: number) => axiosInstance.get(endpoints.products.detail(id)),
  create: (data: FormData) =>
    axiosInstance.post(endpoints.products.list, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id: number, data: FormData) =>
    axiosInstance.post(endpoints.products.detail(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: number) => axiosInstance.delete(endpoints.products.detail(id)),
  getImages: (id: number) => axiosInstance.get(endpoints.products.images(id)),
  uploadImages: (id: number, data: FormData) =>
    axiosInstance.post(endpoints.products.images(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteImage: (id: number) =>
    axiosInstance.delete(endpoints.products.imageDelete(id)),
  replaceImages: (id: number, data: FormData) =>
    axiosInstance.post(endpoints.products.imagesReplace(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  categories: () => axiosInstance.get(endpoints.products.categories),
  brands: () => axiosInstance.get(endpoints.products.brands),
  search: (params: any) =>
    axiosInstance.get(endpoints.search.query, { params }),
  singleProductImages: (id: number) =>
    axiosInstance.get(endpoints.products.singleProductImages(id)),
  singleProduct: (id: number) =>
    axiosInstance.get(endpoints.products.singleProduct(id)),
};

export const cartApi = {
  items: () => axiosInstance.get(endpoints.cart.items),
  add: (data: AddCartItemData) => axiosInstance.post(endpoints.cart.add, data),
  total: () => axiosInstance.get(endpoints.cart.total),
  count: () => axiosInstance.get(endpoints.cart.count),
  update: (id: number, data: { quantity: number }) =>
    axiosInstance.put(endpoints.cart.update(id), data),
  remove: (id: number) => axiosInstance.delete(endpoints.cart.remove(id)),
  clear: () => axiosInstance.delete(endpoints.cart.clear),
};

export const ordersApi = {
  checkout: (data: CheckoutData) =>
    axiosInstance.post(endpoints.orders.checkout, data),
  singleOrder: (id: number) =>
    axiosInstance.get(endpoints.orders.singleOrder(id)),
  orders: () => axiosInstance.get(endpoints.orders.orders),
  items: (id: number) => axiosInstance.get(endpoints.orders.items(id)),
  status: (id: number) => axiosInstance.get(endpoints.orders.status(id)),
  cancel: (id: number) => axiosInstance.put(endpoints.orders.cancel(id)),
};

export const reviewsApi = {
  list: (id: number) => axiosInstance.get(endpoints.reviews.list(id)),
  create: (id: number, data: ReivewData) =>
    axiosInstance.post(endpoints.reviews.create(id), data),
  delete: (id: number) => axiosInstance.delete(endpoints.reviews.delete(id)),
  productReview: (id: number, params?: any) =>
    axiosInstance.get(endpoints.reviews.productReviews(id), { params }),
  rating: (id: number) => axiosInstance.get(endpoints.reviews.rating(id)),
  update: (id: number, data: unknown) =>
    axiosInstance.put(endpoints.reviews.update(id), data),
  helpful: (id: number, data: unknown) =>
    axiosInstance.post(endpoints.reviews.helpful(id), data),
};

export const categoriesApi = {
  list: () =>
    axiosInstance.get(endpoints.categories.list, { withCredentials: true }),
  getById: (id: number) => axiosInstance.get(endpoints.categories.detail(id)),
};

export const brandsApi = {
  list: () => axiosInstance.get(endpoints.brands.list),
  getById: (id: number) => axiosInstance.get(endpoints.brands.detail(id)),
};

export const userApi = {
  update: (id: number, data: UpdateUserProfileRequest) =>
    axiosInstance.put(endpoints.user.update(id), data),
  profile: (id: number) =>
    axiosInstance.get(endpoints.user.profile(id), { withCredentials: true }),
  orders: (id: number) => axiosInstance.get(endpoints.user.orders(id)),
  reviews: (id: number) => axiosInstance.get(endpoints.user.reviews(id)),
};

export const testApi = {
  public: () => axiosInstance.get(endpoints.test.public),
  protected: () => axiosInstance.get(endpoints.test.protected),
  admin: () => axiosInstance.get(endpoints.test.admin),
  session: () => axiosInstance.get(endpoints.test.session),
  ownership: (id: number) => axiosInstance.get(endpoints.test.ownership(id)),
};
