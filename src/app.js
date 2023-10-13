import  express  from 'express';
import datosrouter from './routes/datos.routes.js';
import indexrouter from './routes/index.routes.js';
import { PORT } from './config/config.js'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())

app.use(indexrouter)

app.use(datosrouter)

app.use((req,res,next)=> {
    res.status(404).json({
        message:"Endpoint not found"
    })
})

app.listen(PORT)
console.log('http://localhost:3000/datos/')