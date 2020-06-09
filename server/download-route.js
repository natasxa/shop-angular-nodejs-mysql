const router = require('express').Router()
const mysql = require('mysql')
const path = require('path')
const table = require('table').table;
const fs = require('fs')
const formidable = require('formidable')
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
    console.log("download-route connected to mysql")
})

router.post('/', onlyUsers, async (req, res) => {
    console.log('somebody tries to save a bill to server')
    //prepearing to rename file:
    let b = await Query(`SELECT * FROM orders`)
    console.log(b.length, 'LENGTH')
    let filename = 'bill_' + b.length + '.txt'
    //prepearing content:
    console.log(req.body, 'BODY')
    let items = req.body
    console.log(items.length, 'LENGTH OF ORDER')
    let data = [
        ["********************THE BILL********************"]
    ]
    let total = 0
    for (item of items) {
        total += item.price_all
        data.push([item.name + ', ' + item.quantity + ' x ' + item.price_unit + " ₪" + ' = ' + item.price_all + " ₪"])
    }
    data.push(["Total: " + total + " ₪"])
    let output = table(data);
    //save bill to folder:
    fs.writeFile(__dirname + "/download/" + filename, output, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.end();
})

router.get('/:name', onlyUsers, (req, res) => {
    console.log('somebody tries to download a bill')
    filePath = path.join(__dirname + "/download/" + req.params.name)
    console.log(filePath)
    res.sendFile(filePath)
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