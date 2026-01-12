import express from 'express'
import env from './config/env'
import cookieParser from 'cookie-parser'
import responseHandler from './middlewares/responseHanlder'
import errorHandler from './middlewares/errorHandler'

import productRoutes from './routes/product.routes'
import categoryRoutes from './routes/category.routes'
import chatRoutes from './routes/chat.routes'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(responseHandler)

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/chat',chatRoutes)



app.use(errorHandler)


app.listen(env.PORT || 8080, "0.0.0.0", () => {
    console.log(`Listening on port ${env.PORT || 8080}`)
})




