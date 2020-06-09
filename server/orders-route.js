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
    console.log("orders-route connected to mysql")
})

//get all orders (for login page)
router.get("/", async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM orders`)
        res.json(b)
    } catch (err) {
        res.send(500, "oops...")
        throw err
    }
})
//get orders by user id 
router.get("/:user_id", onlyUsers, async (req, res) => { 
    console.log('someone tries to get orders by ID') 
    try {
        let b = await Query(`SELECT * FROM orders WHERE user_id = ?`, [req.params.user_id])
        console.log(b)
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..") 
        throw err
    }
})
//check date for delivery
router.get("/date/:dd", onlyUsers, async (req, res) => { 
    console.log('someone tries to check a day for delivery') 
    try {
        let b = await Query(`SELECT * FROM orders WHERE date_delivery = ?`, [req.params.dd])
        console.log(b)
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..") 
        throw err
    }
})
//save order to DB
router.post("/", onlyUsers, async (req,res) => {
    console.log("someone tries to save the order to DB")
    try {
        let { user_id, cart_id, city, street, price_total, date_delivery, date_ordered, credit_card } = req.body
        let q = `INSERT INTO orders (user_id, cart_id, city, street, price_total, date_delivery, date_ordered, credit_card)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)` //don't need "" for string
        let b = await Query(q, user_id, cart_id, city, street, price_total, date_delivery, date_ordered, credit_card)
        res.sendStatus(200) //ok
    } catch (err) {
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
