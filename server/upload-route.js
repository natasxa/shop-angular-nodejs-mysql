const router = require('express').Router()
const mysql = require('mysql')
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

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
    console.log("upload-route connected to mysql")
})

router.post('/', (req, res) => {
    console.log('somebody tries to upload a picture')
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        //preparation to rename file:
        let b = await Query(`SELECT * FROM items`)
        files.filetoupload.name = b.length + 1 + ".jpg"
        //check if file type is valid:
        console.log(files.filetoupload.type, 'TYPE FOR CHECK')
        if (files.filetoupload.type === "image/png" ||
            files.filetoupload.type === "image/jpg" ||
            files.filetoupload.type === "image/jpeg") {
            //move file:
            let oldpath = files.filetoupload.path;
            let newpath = path.join(__dirname + "/upload/" + files.filetoupload.name)
            fs.rename(oldpath, newpath, (err) => {
                if (err) throw err;
            });
        }
        res.end();
    });
})

router.post('/update', (req, res) => {
    console.log('somebody tries to update a picture')
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        //preparation to rename file with curently existing:
        let b = await Query(`SELECT img_url FROM items WHERE id = ${fields.id}`)
        let one = JSON.stringify(b)
        let two = one.replace('[{"img_url":"http://localhost:1000/upload/', '') //cut start
        let three = two.replace('"}]', '') //cut end
        let four = three.split(".", [2]) //split
        files.filetoupload.name = four[0] + '.jpg' //convert to jpg
        //check if file type is valid:
        console.log(files.filetoupload.type, 'TYPE FOR CHECK')
        if (files.filetoupload.type === "image/png" ||
            files.filetoupload.type === "image/jpg" ||
            files.filetoupload.type === "image/jpeg") {
            //move file:
            let oldpath = files.filetoupload.path;
            let newpath = path.join(__dirname + "/upload/" + files.filetoupload.name)
            fs.rename(oldpath, newpath, (err) => {
                if (err) throw err;
            });
        }
        res.end();
    });
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