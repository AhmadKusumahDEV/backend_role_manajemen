import { Sequelize } from "sequelize";
import db from '../config/database.js'
import Users from "./UserModel.js";

const {DataTypes} = Sequelize


const Products = db.define('products',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNullL: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNullL: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        validate: {
            notEmpty: true
        }
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNullL: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true
})

Users.hasMany(Products)
Products.belongsTo(Users, {foreignKey: "userId"})

export default Products