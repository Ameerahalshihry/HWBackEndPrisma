import express, {Application} from 'express'
import userRouter from './routes/user.route'
const app:Application = express()
const port = 3009

app.use(express.json());

app.use('/users', userRouter)

app.listen(port,()=>console.log(`express started on port ${port}`));