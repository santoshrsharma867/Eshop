require('dotenv').config()
const bodyParser = require('body-parser');
const morgan = require('morgan')
const express = require('express');
const app = express();
const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')
const userRoute = require('./routes/user')
const orderRoute= require('./routes/order')
var { expressjwt: jwt } = require("express-jwt");
const errorHandler = require('./helper/error_handler')
const fileupload = require('express-fileupload')


const mongoose = require('mongoose');
var connectionURL = 'mongodb+srv://admin:santosh867@cluster0.j2zv34t.mongodb.net/ESHOP?retryWrites=true&w=majority';
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

},
{ strictPopulate: false }

)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//middle ware for general    
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(fileupload({
    useTempFiles:true
}))
// app.use(
//     jwt({
//         secret: process.env.SECRET_KEY,
//         algorithms: ["HS256"],
//         isRevoked: isRevoked
//     }).unless({
//         path: [
//             { url: "/api/v1/product", method: ["GET", 'OPTION'] },
//             "/api/v1/user/login",
//             "/api/v1/order",
//             "/api/v1/user",

//         ]
//     })

// );


// async function isRevoked(req, payload, done) {
//     if (!payload.isAdmin) {
//         done(null, true)
//     }

//     done();
// }

// app.use(errorHandler);


//route
app.use('/api/v1/product', productRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/order', orderRoute);

app.get('/', (req, res) => {
    res.send('Welcome Santosh ')
})

app.listen(process.env.PORT||4000, () => {
    console.log('server listen on http://localhost:4000');
})