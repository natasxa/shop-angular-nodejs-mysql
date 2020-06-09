const express = require('express')
const cors = require('cors')
const usersRoute = require('./users-route')
const productsRoute = require('./products-route')
const cartsRoute = require('./carts-route')
const ordersRoute = require('./orders-route')
const uploadRoute = require('./upload-route')
const downloadRoute = require('./download-route')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/upload/', express.static('upload'));
app.use('/download/', express.static('download'));
app.use(cors())
app.use (express.json())
 
app.use("/users", usersRoute)
app.use("/products", productsRoute)
app.use("/carts", cartsRoute)
app.use("/orders", ordersRoute)
app.use("/fileupload", uploadRoute)
app.use("/filedownload", downloadRoute)

app.listen(1000, () => console.log("rockin'1000")) 