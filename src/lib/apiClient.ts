import type {
  AddCartItemData,
  BrandFormData,
  CategoryFormData,
  CheckoutData,
  OrderFormData,
  productsFormData,
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

export const productsAdminApi = {
  create: (data: productsFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("category_id", data.category_id.toString());
    formData.append("brand_id", data.brand_id.toString());

    // Handle main_image
    formData.append("main_image", data.main_image);

    // Handle additional_images
    if (data.additional_images && Array.isArray(data.additional_images)) {
      data.additional_images.forEach((img) => {
        formData.append("additional_images[]", img);
      });
    }

    if (data.specifications)
      formData.append("specifications", data.specifications);

    return axiosInstance.post(endpoints.productsAdminApi.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  update: (id: number, data: productsFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("category_id", data.category_id.toString());
    formData.append("brand_id", data.brand_id.toString());

    // Handle main_image
    if (data.main_image instanceof File) {
      formData.append("main_image", data.main_image);
    }

    // Handle additional_images
    if (data.additional_images && Array.isArray(data.additional_images)) {
      data.additional_images.forEach((img) => {
        formData.append("additional_images[]", img);
      });
    }

    if (data.specifications)
      formData.append("specifications", data.specifications);

    return axiosInstance.post(endpoints.productsAdminApi.update(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  delete: (id: number) =>
    axiosInstance.delete(endpoints.productsAdminApi.delete(id)),
  uploadImages: (id: number, data: File[]) => {
    const formData = new FormData();
    data.forEach((img) => {
      formData.append("images[]", img);
    });
    return axiosInstance.post(
      endpoints.productsAdminApi.uploadImages(id),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  },
  deleteImage: (id: number) =>
    axiosInstance.delete(endpoints.productsAdminApi.deleteImage(id)),
  replaceImages: (id: number, data: string[]) =>
    axiosInstance.post(endpoints.productsAdminApi.replaceImages(id), data),
};

export const categoriesAdminApi = {
  create: (data: CategoryFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("cat_image", data.cat_image);
    return axiosInstance.post(endpoints.categoriesAdminApi.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  update: (id: number, data: CategoryFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.cat_image instanceof File) {
      formData.append("cat_image", data.cat_image);
    }
    return axiosInstance.post(
      endpoints.categoriesAdminApi.update(id),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  },
  delete: (id: number) =>
    axiosInstance.delete(endpoints.categoriesAdminApi.delete(id)),
};

export const brandsAdminApi = {
  create: (data: BrandFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("logo", data.logo);
    return axiosInstance.post(endpoints.brandsAdminApi.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  update: (id: number, data: BrandFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    }
    return axiosInstance.post(endpoints.brandsAdminApi.update(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  delete: (id: number) =>
    axiosInstance.delete(endpoints.brandsAdminApi.delete(id)),
};

export const ordersAdminApi = {
  update: (id: number, data: OrderFormData) => {
    const formData = new FormData();
    formData.append("status", data.status);
    return axiosInstance.put(endpoints.orderAdminApi.update(id), formData);
  },
  list: () => axiosInstance.get(endpoints.orderAdminApi.list),
};
