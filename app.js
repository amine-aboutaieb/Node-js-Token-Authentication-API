const express = require('express')
const app = express()
const port = 8080
const routes = require('./routes')


app.use(express.urlencoded({extended : true}))

app.use('/', routes);


app.listen(port,()=>{
    console.log(`listening on ${port}`);
})