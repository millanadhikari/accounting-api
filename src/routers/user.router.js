const express = require('express')
const router = express.Router();
const { hashPassword, comparePassword } = require("../helpers/bycrypt.helper");
const { createAccessJWT, createRefreshJWT } = require('../helpers/jwt.helper');
const { insertUser, getUserByEmail } = require('../modals/user/User.model');


router.all('/', (req, res, next) => {
       next()
})

// User Sign in Endpoint
router.post('/login', async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ status: "error", message: "No Valid credentials" })
    }
    const user = await getUserByEmail(email)

    if(!user) { 
        return res.json ({status:"error", message:"Invalid Email"})
    }
    const passFromDb = user && user.id ? user.password : null
    if (!passFromDb) {
        return res.json({ status: "error", message: "Invalid email or password" })
    }

    const result = await comparePassword(password, passFromDb);
    console.log(result)
    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password" })
    }
    const accessJWT = await createAccessJWT(user.email, `${user._id}`)

    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`)

    res.json({ status: "success", message: "Login success", accessJWT, refreshJWT })

})

router.post("/", async (req, res) => { 
    const {name, phone, email, password} = req.body
    try {
        //hashing password
        const hashPass = await hashPassword(password)

        const newUserObj = {
            name,
            phone,
            email,
            password: hashPass,
        }


        const result = await insertUser(newUserObj)
        console.log(result)
        res.json({ message: "New user created", result })

    } catch (error) { 
        console.log(error)
        res.json({status:"error", message:error.message})
    }
    
})

//Create User End point


module.exports = router