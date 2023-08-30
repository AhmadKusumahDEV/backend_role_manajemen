import Express from "express";
import {
    getUsers,
    getUsersByid,
    createUsers,
    updateUsers,
    deleteUsers
} from '../controllers/Users.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = Express.Router()


router.get('/users', verifyUser, adminOnly, getUsers)
    .post('/users', verifyUser, adminOnly, createUsers)

router.get('/users/:id', verifyUser, adminOnly, getUsersByid)
    .patch('/users/:id', verifyUser, adminOnly, updateUsers)
    .delete('/users/:id', verifyUser, adminOnly, deleteUsers)


export default router