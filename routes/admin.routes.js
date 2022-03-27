import express from 'express';
import administrator from '../controllers/admin';


const router = express.Router();

router.post('/product', administrator.createProduct);

router.get('/product/:id', administrator.readProduct);

module.exports = router;