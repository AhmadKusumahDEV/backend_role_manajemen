import express from 'express'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import db from './config/database.js'
import SequlizeStore from 'connect-session-sequelize'
import UserRoute from './routes/UserRoute.js'
import ProductRoute from './routes/ProductRoute.js'
import Authroute from './routes/authroute.js'

dotenv.config()

const app = express()

const sessionStore = SequlizeStore(session.Store)

const Store = new sessionStore({
    db: db
})
// ;(async () => {
//     await db.sync()
// })()

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: Store,
    cookie: {
        secure: 'auto'
    }
}))
// pass admin : 12344
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))


app.use(express.json())
app.use(ProductRoute)
app.use(UserRoute)
app.use(Authroute)


// Store.sync()
const port = process.env.APP_PORT

app.listen(port, () => {
    console.log(`server running ${port}`)
})