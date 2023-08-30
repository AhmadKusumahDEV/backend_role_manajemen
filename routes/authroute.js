import  Express  from "express";
import {Login, Me, LogOut} from '../controllers/auth.js'


const router = Express.Router()

router.get('/me', Me)
router.post('/login', Login)
router.delete('/logout', LogOut)

export default router;
