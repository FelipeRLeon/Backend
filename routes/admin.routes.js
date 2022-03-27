import express from 'express';
import administrator from '../controllers/admin';


const router = express.Router();

router.post('/product', administrator.createProduct);

router.get('/product/:id_p', administrator.readProduct);

router.put('/product/:id_p', administrator.updateProduct);

router.delete('/product/:id_p', administrator.deleteProduct);

router.get('/allproducts', administrator.getProducts);

module.exports = router;