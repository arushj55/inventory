const express = require("express");
const app = express();
const cors = require("cors");
const routes = require('./routes/index.route');




require('./db.init');

app.use('/assets', express.static(process.cwd()+'/public'))
app.set('view engine', 'pug');
app.set("view", process.cwd()+"/views")

// parsing 
app.use(express.json());
app.use(express.urlencoded())

process.env.JWT_SECRET="Arush";

app.use(cors());

app.use('/', routes);


app.use((req,res, next)=>{
    next({
        statusCode: 404,
        msg: "Not found"
    });
})

// Error handling middleware
app.use((error, req, res, next) => {
    console.log("Error: ", error);
    let status = error?.statusCode || 500;
    let msg = error?.msg || "Server error";

    res.status(status).json({
        status: false,
        data: null,
        msg: msg
    })
})

// app level middleware
// router level middleware
// custom middleware
// third party middleware
// error handling middleware

app.listen(3005, 'localhost', (err) => {
    if(!err){
        console.log("Server is listening to port 3005");
        console.log("Press CTRL+C to end server");
    }
})
