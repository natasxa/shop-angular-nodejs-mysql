const router = require('express').Router()
const mysql = require('mysql')
const { onlyUsers } = require('./mw')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shopping"
});

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("carts-route connected to mysql")
})
//get all carts
router.get("/", onlyUsers, async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM carts`)
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})
//get cart by user id 
router.get("/:user_id", onlyUsers, async (req, res) => {
    console.log('someone tries to get carts by user ID')
    try {
        let b = await Query(`SELECT * FROM carts WHERE user_id = ?`, [req.params.user_id])
        console.log(b)
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})

//get cart details
router.get('/cart/:cart_id', onlyUsers, async (req, res) => {
    console.log('someone tries to get cart by cart ID')
    try {
        let b = await Query(`SELECT * 
        FROM cart_details 
        INNER JOIN items
        ON cart_details.item_id = items.id
        WHERE cart_id = ?`, [req.params.cart_id])
        console.log(b)
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})
//create new cart
router.post("/", onlyUsers, async (req, res) => {
    console.log('someone tries to create new cart')
    try {
        let b = await Query(`INSERT INTO carts (user_id) VALUES (${req.body.user_id})`)
        console.log(b)
        res.json(b)
        //res.sendStatus(201) //"created" 
    } catch (err) {
        //res.send(500, "ooops..")
        throw err
    }
})
//add item to cart
router.post("/cart", onlyUsers, async (req, res) => {
    console.log('someone tries to add new item to cart')
    try {
        let { item_id, cart_id, quantity, price_unit, price_all } = req.body
        let q = `INSERT INTO cart_details (item_id, cart_id, quantity, price_unit, price_all)
        VALUES (?, ?, ?, ?, ?)`
        let b = await Query(q, item_id, cart_id, quantity, price_unit, price_all)
        res.send(201)
    } catch (err) {
        //res.send(500, "oops...")
        throw err
    }
})
//update item in cart
router.put('/item/update', onlyUsers, async (req, res) => {
    console.log('someone tries to update item in cart')
    try {
        let b = await Query(`
        UPDATE cart_details SET quantity = quantity + ${req.body.quantity}, price_all = price_all + ${req.body.price_all}
        WHERE cart_id = ${req.body.cart_id} && item_id = ${req.body.item_id}`)
        console.log(b)
        res.json(b)
        res.status(204)
    } catch (err) {
        res.status(500).send("ooops..")
        throw err
    }
})
//delete 1 item from cart
router.put('/item', onlyUsers, async (req, res) => {
    console.log('someone tries to delete 1 item from cart')
    try {
        let b = await Query(`DELETE FROM cart_details WHERE cart_id = ${req.body.cart_id} && item_id = ${req.body.item_id}`)
        console.log(b)
        res.json(b)
        res.status(200)
    } catch (err) {
        res.status(500).send("ooops..")
        throw err 
    }
})
//delete all items from cart
router.delete('/:cart_id', onlyUsers, async (req, res) => {
    console.log('someone tries to delete all items from cart', [req.params.cart_id])
    try {
        let b = await Query(`DELETE FROM cart_details WHERE cart_id = ?`, [req.params.cart_id])
        res.json(b)
        res.send(204, "successfully deleted")
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})

function Query(q, ...p) {
    return new Promise((resolve, reject) => {
        db.query(q, p, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = router;
