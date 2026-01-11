import express from 'express'
import env from './config/env'
import cookieParser from 'cookie-parser'



const app = express()

app.use(express.json())
app.use(cookieParser())


app.listen(env.PORT || 8080, "0.0.0.0", () => {
    console.log(`Listening on port ${env.PORT || 8080}`)
})

