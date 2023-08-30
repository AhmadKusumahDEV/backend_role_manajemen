import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProducts = async (req , res) => {
    try {
        let response;
        if(req.role === 'admin'){
            response = await Products.findAll({
                attributes: ['uuid','name','price'],
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        }else { 
            response = await Products.findAll({
                attributes: ['uuid','name','price'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

export const getProductsByid = async (req , res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if(!product) return res.status(404).json({msg: "data menghilang dari lane"})
        let response;
        if(req.role === 'admin'){
            response = await Products.findOne({
                attributes: ['uuid','name','price'],
                where: {
                    id: product.id
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        }else { 
            response = await Products.findOne({
                attributes: ['uuid','name','price'],
                where: {
                    [Op.and]: [{id: product.id}, {userId: req.userId}]
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

export const createProducts = async (req , res) => {
    const {name , price} = req.body
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId
        })
        res.status(201).json({msg: "berhasil membuat produk cuy"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

export const updateProducts = async (req , res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if(!product) return res.status(404).json({msg: "data menghilang dari lane"})
        const {name , price} = req.body
        if(req.role === 'admin'){
                await product.update({name, price}, {
                    where: {
                        id: product.id
                    }
                })
        }else { 
            if (req.userId !== product.userId) return res.status(403).json({msg: "Tidak Dapat Akses"})
            await product.update({name, price}, {
                where: {
                    [Op.and]: [{id: product.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "product updated succes cuy"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

export const deleteProducts = async (req , res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if(!product) return res.status(404).json({msg: "data menghilang dari lane"})
        const {name , price} = req.body
        if(req.role === 'admin'){
                await product.destroy({
                    where: {
                        id: product.id
                    }
                })
        }else { 
            if (req.userId !== product.userId) return res.status(403).json({msg: "Tidak Dapat Akses"})
            await product.destroy({
                where: {
                    [Op.and]: [{id: product.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "product kehapus succes cuy"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}