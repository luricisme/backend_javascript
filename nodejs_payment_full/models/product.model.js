const db = require('../config/db')('public');

module.exports = {
    allProductsByCatID: async (field) => {
        try {
            const products = await db.allByField('Products', 'CatID', field);
            return products;
        } catch (err) {
            throw new Error(`Error finding products by catID: ${err.message}`);
        }
    },  

    getProductByID: async (field) => {
        try{
            const product = await db.one('Products', 'ProID', field);
            return product;
        } catch (err) {
            throw new Error(`Error finding product by ProID: ${err.message}`);
        }
    },

    addProduct: async (ProName, TinyDes, FullDes, Price, CatID, Quantity, ProImage) => {
        try {
            // Tạo đối tượng product để thêm vào DB
            const product = {
                ProName,
                TinyDes,
                FullDes,
                Price,
                CatID,
                Quantity,
                ProImage  // Lưu URL của ảnh nếu có
            };

            // Thêm sản phẩm vào DB
            const newProduct = await db.add('Products', product);
            return newProduct;  // Trả về thông tin sản phẩm mới thêm
        } catch (err) {
            throw new Error(`Error creating product: ${err.message}`);
        }
    },

    updateProduct: async (ProID, ProName, TinyDes, FullDes, Price, CatID, Quantity, ProImage) => {
        try {
            // Tạo đối tượng product để cập nhật trong DB
            const product = {
                ProName,
                TinyDes,
                FullDes,
                Price,
                CatID,
                Quantity,
                ProImage  // Cập nhật ảnh sản phẩm nếu có
            };

            // Cập nhật sản phẩm trong DB
            const updatedProduct = await db.update('Products', product, 'ProID', ProID);
            return updatedProduct;  // Trả về thông tin sản phẩm đã được cập nhật
        } catch (err) {
            throw new Error(`Error updating product: ${err.message}`);
        }
    },

    deleteProduct: async (ProID) => {
        try {
            const deletedProduct = await db.deleteByField('Products', 'ProID', ProID);
            
            if (deletedProduct.length > 0) {
                return { success: true, message: `Product with ID ${ProID} deleted successfully` };
            } else {
                return { success: false, message: `Product with ID ${ProID} not found` };
            }
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}