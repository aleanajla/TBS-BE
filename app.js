const cors = require('cors')
const express = require('express')
let app = express()
let port = 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const router = require("./routes")
app.use("/api", router.user_router)
app.use("/api", router.STID_router)
app.use("/api", router.booking_router)
app.use("/api", router.slot_router)
app.use("/api", router.assignJob_router)
// app.use("/api", router.)

app.listen(port, () =>{
    console.log(`Listenting to port: ${port} `)
})
