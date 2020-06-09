const router = require('express').Router()
const mysql = require('mysql')
const { onlyUsers, onlyAdmins } = require('./mw')

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
    console.log("products-route connected to mysql")
})

//get all items (for login page)
router.get("/items", async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM items`)
        res.json(b)
    } catch (err) {
        res.send(500, "oops...")
        throw err
    }
})
//get items by category
router.get('/category/:category_id', onlyUsers, async (req, res) => {
    console.log('someone tries to get items by category ID')
    try {
        let b = await Query(`SELECT * FROM items WHERE category_id = ?`, [req.params.category_id])
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})
//create new item
router.post('/item', onlyAdmins, async (req, res) => {
    console.log('someone tries to create a new item')
    try {
        let b = await Query(`INSERT INTO items (name, category_id, price, img_url)
        VALUES ("${req.body.name}", ${req.body.category_id}, ${req.body.price}, "${req.body.img_url}")`)
        res.json(b)
        res.sendStatus(201) //"created"
    } catch (err) {
        res.status(400).send("some error ocured")
        throw err
    }
})
//update item
router.put('/item', onlyAdmins, async (req, res) => {
    console.log('someone tries to update item')
    try {
        let b = await Query(`UPDATE items SET name="${req.body.name}", category_id=${req.body.category_id}, 
        price=${req.body.price}, img_url="${req.body.img_url}" WHERE id=${req.body.id}`)
        res.json(b)
    } catch (err) {
        res.status(400).send("some error ocured")
        throw err
    }
})

function Query(q, ...par) {
    return new Promise((resolve, reject) => {
        db.query(q, par, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = router;
