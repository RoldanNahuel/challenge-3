const express = require('express')
const contenedor = require('./contenedor.js')

const app = express()
const container = new contenedor('./productos.txt')

const connectedServer = app.listen(8080, () => {
    console.log(`Servidor iniciado correctamente en ${connectedServer.address().port}`)
})

app.get('/productos', async (req, res) => {
    try {
        const products = await container.getAll()
        res.send(products)
    } catch (error) {
        res.send(error)
    }
});

app.get('/productoRandom', async (req, res) => {    
    try {
        const products = await container.getAll()
        const random = Math.floor(
            Math.random() * products.length + 1 
        )
        const product = await container.getById(random)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
});