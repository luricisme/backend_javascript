const catModel = require('../models/cat.model');
const productModel = require('../models/product.model');
const path = require('path');
const fs = require('fs');

class SiteController {
    async getHomePage(req, res) {
        // if(req.isAuthenticated()){
        //     res.render('home');
        // } else {
        //     // console.log(res.locals.message); 
        //     res.render('login', {
        //         message: res.locals.message
        //     });
        // }
        const categories = await catModel.allCategories();
        res.render('home', { categories });
    }

    async getFullProductPage(req, res) {
        const catID = req.query.id;
        try {
            const products = await productModel.allProductsByCatID(catID);
            console.log('PRODUCTS: ', products);
            if (products.length > 0) {
                res.render('product', { products });
            } else {
                res.status(404).send('Products not found');
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error while get products');
        }
    }

    async getDetailProductPage(req, res) {
        const proID = req.query.id;
        console.log('PRODUCTS ID: ', proID);
        try {
            const product = await productModel.getProductByID(proID);
            console.log('PRODUCT: ', product);
            if (product) {
                res.render('detail-product', { product });
            } else {
                res.status(404).send('Product not found');
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error while view detail product');
        }
    }

    async getAddProductPage(req, res) {
        res.render('add-product');
    }

    async handleAddProduct(req, res) {
        try {
            const { ProName, TinyDes, FullDes, Price, CatID, Quantity } = req.body;
            const proImage = req.files ? req.files.ProImage : null;

            if (proImage) {
                const uploadDir = path.join(__dirname, '../../Bai01_Bai02/uploads');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                let imagePath = path.join('uploads', Date.now() + '-' + proImage.name);
                imagePath = imagePath.replace(/\\/g, '/'); 
                await proImage.mv(path.join(uploadDir, Date.now() + '-' + proImage.name)); 

                const product = await productModel.addProduct(
                    ProName,
                    TinyDes,
                    FullDes,
                    Price,
                    CatID,
                    Quantity,
                    imagePath
                );

                res.redirect(`/categories/view?id=${product.CatID}`);; 
            } else {
                const product = await productModel.addProduct(
                    ProName,
                    TinyDes,
                    FullDes,
                    Price,
                    CatID,
                    Quantity,
                    null
                );

                res.redirect(`/categories/view?id=${product.CatID}`);
            }

        } catch (err) {
            console.error(err);
            res.status(500).send('Error adding product');
        }
    }

    async getEditProductPage(req, res){
        try {
            const productId = req.query.id;

            const product = await productModel.getProductByID(productId);
    
            if (!product) {
                return res.status(404).send('Product not found');
            }

            res.render('edit-product', { product });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving product');
        }
    }

    async handleEditProduct(req, res){
        try {
            const { ProID, ProName, TinyDes, FullDes, Price, CatID, Quantity } = req.body;
            const proImage = req.files ? req.files.ProImage : null;
            let updatedImage = null;

            if (proImage) {
                const uploadDir = path.join(__dirname, '../../Bai01_Bai02/uploads');
    
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
    
                updatedImage = path.join('uploads', Date.now() + '-' + proImage.name);
    
                await proImage.mv(path.join(uploadDir, Date.now() + '-' + proImage.name));
            }
    
            const product = await productModel.updateProduct(
                ProID,
                ProName,
                TinyDes,
                FullDes,
                Price,
                CatID,
                Quantity,
                updatedImage || null 
            );

            res.redirect(`/categories/view?id=${product.CatID}`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error updating product');
        }
    }

    async handleDeleteProduct(req, res){
        try {
            const productId = req.query.id; 
    
            if (!productId) {
                return res.status(400).send('Product ID is required');
            }
    
            const result = await productModel.deleteProduct(productId);
    
            if (result.success) {
                res.status(200).send(result.message);
            } else {
                res.status(404).send(result.message); 
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error deleting product');
        }
    }
}

module.exports = new SiteController();