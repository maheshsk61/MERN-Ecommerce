const express = require('express')
const app = express()
const port = 2000
const cors = require('cors')
const router = require('./routes/ecommerce.routes')
app.use(cors())
app.use(express.json())
app.use("/Account", router)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})