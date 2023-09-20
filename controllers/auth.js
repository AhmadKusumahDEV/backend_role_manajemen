import Users from "../models/UserModel.js";
import argon2 from 'argon2'

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email // select * from users where email = req.body.email
        }
    })
    if (!user) return res.status(404).json({ msg: "user menghilang dari lane" })
    const match = await argon2.verify(user.password, req.body.password)
    if (!match) return res.status(400).json({ msg: "password salah cuy" })
    req.session.userId = user.uuid
    const { uuid, name, email, role } = user
    res.status(200).json({ uuid, name, email, role })
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "login dulu broow" })
    }
    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({ msg: "user menghilang dari lane" })
    res.status(200).json(user)
}

export const LogOut = (req, res) => {
    req.session.destroy((error) => {
        if (error) return res.status(400).json({ msg: "tidak bisa logout" })
        res.status(200).json({ msg: "berhasil logOut cuy" })
    })
}