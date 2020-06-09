const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shopping"
});

db.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log("users-route connected to mysql")
    }
})

//test - get all users
router.get("/", async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM users`)
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})
//get user by user_id
router.get("/:id", async (req, res) => {
    console.log('someone tries to check user id')
    try {
        let b = await Query(`SELECT * FROM users WHERE user_id = ?`, [req.params.id])
        console.log(b)
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})
//registration
router.post('/register', async (req, res) => {
    console.log('someone tries to add new user')
    //refresh token:
    const salt = await bcrypt.genSaltSync(10)  
    const pass = req.body.password
    console.log(pass)
    const hash = await bcrypt.hashSync(pass, salt) 
    console.log(hash)     
    try {
        let b = await Query(`INSERT INTO users (user_id, email, password, city, street, f_name, l_name, isAdmin)
        VALUES (${req.body.user_id}, "${req.body.email}", "${hash}", "${req.body.city}", "${req.body.street}", "${req.body.f_name}", "${req.body.l_name}", 0)`) //change 0 -> 1 to create admin
        console.log(b)
        res.json(b)
        res.sendStatus(201) //"created"
    } catch (err) {
        res.status(400).send("some error ocured")
        throw err
    }
})

//login
router.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (email && password) {
        const q = `SELECT * FROM users`
        const users = await Query(q)
        const user = users.find(u => u.email === email) 
        if (user) {
            console.log(user, "USER")
            console.log(password, user.password)
            console.log(bcrypt.compareSync(password, user.password))
            if (bcrypt.compareSync(password, user.password)) {
                jwt.sign({ email, isAdmin: user.isAdmin }, "blah", (err, token) => { //check first attribute
                    if (err) {
                        res.sendStatus(500)   
                        throw err
                    }
                    let user_id = user.user_id
                    let isAdmin = user.isAdmin
                    let f_name = user.f_name
                    let city = user.city
                    let street = user.street
                    res.json({ token, f_name, user_id, isAdmin, city, street })
                    console.log(token)
                })
            } else {
                res.status(400).send("wrong password")
            }
        } else {
            res.status(400).send("user not found")
        }
    } else {
        res.status(400).send("missing some info")
    }
})

let Query = (q, ...p) => {
    return new Promise((resolve, reject) => {
        db.query(q, p, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = router;