import Users from '../models/UserModel.js'

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "login dulu broow"})
    }
    const user =  await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg: "user menghilang dari lane"})
    req.userId = user.id
    req.role = user.role
    next()
}

export const adminOnly = async (req, res, next) => {
    const user =  await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg: "user menghilang dari lane"})
    if(user.role !== 'admin') return res.status(403).json({msg: "balik LU gak boleh di sini"})
    next()
}