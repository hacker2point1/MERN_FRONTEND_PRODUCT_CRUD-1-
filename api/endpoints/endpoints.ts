export const endpoints = {
    product:{
        getAllProduct: "/api/v1/get/all-products",
        editProduct:"/api/v1/update/product/:id",
        singleProduct:"/api/v1/get/single-products/:id",
        deleteProduct:"/api/v1/delete/product/:id",
        softDeleteProduct:"/api/v1/deleteSoft/product/:id",
        searchProduct:"/api/v1/search/product",
        getDeletedProducts:"/api/v1/trash",
        restoreProduct:"/api/v1/restore/:id"
    }
}

export const endpoint =  [
    endpoints.product.getAllProduct,
    endpoints.product.editProduct,
    endpoints.product.singleProduct,
    endpoints.product.deleteProduct,
    endpoints.product.searchProduct,
    endpoints.product.getDeletedProducts,
    endpoints.product.restoreProduct
]