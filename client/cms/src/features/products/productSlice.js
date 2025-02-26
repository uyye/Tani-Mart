import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    requestData:[],
    presales:[],
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
    setPresalesProducts: (state, action) =>{
      state.presales = action.payload
    },
    setRequestData:(state, action) =>{
      state.requestData = action.payload
    }
  },
});

export 
const { setProduct,
  setDetailProduct,
  removeProduct,
  setFilter,
  setSearch,
  setPresalesProducts,
  setRequestData
} = productSlice.actions;

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

export const fetchDataProductBySeller = ()=>{
  return async (dispatch, getState)=>{
    const {filter, search} = getState().products

    try {
      const {data} = await instance({
        method:"get",
        url:"/products/admin",
        headers:{
          Authorization:`bearer ${localStorage.getItem("access_token")}`
        },
        params:{ search, filter}
      })

      dispatch(setProduct(data))
    } catch (error) {
      console.log(error);
      
    }
  }
}

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

      dispatch(fetchDetailProduct(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPresaleProduct = ()=>{
  return async(dispatch)=>{
    try {
      const {data} = await instance({
        method:"get",
        url:"/products/presales",
        headers:{"Authorization":`bearer ${localStorage.getItem("access_token")}`}
      })

      dispatch(setPresalesProducts(data))
    } catch (error) {
      console.log(error);
      
    }
  }
}

export const fetchRequestProduct = ()=>{
  console.log("Masukkah?");
  
  return async (dispatch)=>{
    try {
      const {data} = await instance({
        method:"get",
        url:"/products/request/seller",
        headers:{"Authorization":`bearer ${localStorage.getItem("access_token")}`}
      })
      
      console.log(data);
      
      dispatch(setRequestData(data))
    } catch (error) {
      console.log(error);
      
    }
  }
}

export const fetchAdminRequestData = ()=>{
  return async (dispatch) =>{
    try {
      const {data} = await instance({
        method:"get",
        url:"/products/request/admin",
        headers:{"Authorization":`bearer ${localStorage.getItem("access_token")}`}
      })

      dispatch(setRequestData(data))
    } catch (error) {
      console.log(error);
      
    }
  }
}

export const fetchAprroveProduct = (id)=>{
  return async(dispatch)=>{
    try {
      await instance({
        method:"post",
        url:"/products/approve",
        data:{productId:id},
        headers:{"Authorization": `bearer ${localStorage.getItem("access_token")}`}
      })

      Swal.fire({
        icon:"success"
      })
    } catch (error) {
      console.log(error);
      
    }
  }
}


export default productSlice.reducer;
