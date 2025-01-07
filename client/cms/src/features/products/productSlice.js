import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    sort: "ASC",
    filter: "",
    search: "",
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setDetailProduct: (state, action) => {
      state.product = action.payload;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    setUpdateProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setProduct, setDetailProduct, removeProduct } =
  productSlice.actions;

export const fetchDataProduct = () => {
  return async (dispatch, getState) => {
    const { sort, filter, search } = getState().products;
    const { data } = await instance({
      method: "get",
      url: "/products/",
      params: {
        sort,
        filter,
        search,
      },
    });
    console.log(data, "DATA PRODUCTS");
    dispatch(setProduct(data));
  };
};

export const fetchDetailProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: "get",
        url: `/products/${id}`,
      });
      dispatch(setDetailProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDeleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await instance({
        method: "delete",
        url: `/products/${id}`,
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(removeProduct(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUpdateProduct = (id, newData) => {
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: "put",
        url: `/products/${id}`,
        data: newData,
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(fetchDataProduct());
    } catch (error) {
      console.log(error);
    }
  };
};

export default productSlice.reducer;
