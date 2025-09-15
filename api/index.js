import express from 'express'

const app = express();

const server = {
    port: 3000
} 

app.listen(server.port,(req,res) => {
    console.log(`Server running at port: ${server.port}`)
})