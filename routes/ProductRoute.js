import Express from "express";
import {
    getProducts,
    getProductsByid,
    createProducts,
    updateProducts,
    deleteProducts
} from '../controllers/Products.js'
import { verifyUser } from "../middleware/AuthUser.js";


const router = Express.Router()

router.get('/products', verifyUser, getProducts)
    .post('/products', verifyUser, createProducts)

router.get('/products/:id', verifyUser, getProductsByid)
    .patch('/products/:id', verifyUser, updateProducts)
    .delete('/products/:id', verifyUser, deleteProducts)

export default router