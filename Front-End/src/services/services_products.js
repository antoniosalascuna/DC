import http from './axios'

const getProductoList = (data) => {

    return http.get("/productos/Lista");
}

const insertProducto = (data) => {

    return http.post("/productos/insertarP", data);
}

const updateProduct = (data) =>{
    
    return http.post("/productos/updateP", data) 
}

export default {

    getProductoList,
    insertProducto,
    updateProduct
}