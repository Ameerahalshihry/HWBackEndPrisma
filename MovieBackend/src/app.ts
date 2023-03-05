import express, {Application} from 'express'
import movieRouter from './routes/movie.route'
const app:Application = express()
const port = 3009

app.use(express.json());

app.use('/movies', movieRouter)

app.listen(port,()=>console.log(`express started on port ${port}`));