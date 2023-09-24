const cors = require('cors')
const express = require('express')
let app = express()
let port = 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.listen(port, () =>{
    console.log(`Listenting to port: ${port} `)
})
