const express = require('express')
const router = express.Router();
const { hashPassword, comparePassword } = require("../helpers/bycrypt.helper");
const { emailProcessor } = require('../helpers/email.helper');
const { createAccessJWT, createRefreshJWT } = require('../helpers/jwt.helper');
const { deleteJWT } = require('../helpers/redis.helper');
const { userAuthorization } = require('../middlewares/authorization.middleware');
const { resetPassReqValidation, updatePassValidation } = require('../middlewares/formValidation.middleware');
const { setPasswordResetPin, getPinByEmailPin, deletePin } = require('../modals/resetPin/resetPin.model');
const { insertUser, getUserByEmail, getUserById, storeUserRefreshJWT, updatePassword } = require('../modals/user/User.model');

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

//Creating a new user
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

// Get customer profile routers
router.get("/", userAuthorization, async (req, res) => {
    //this data coming from database

    const _id = req.userId

    const userProf = await getUserById(_id) 
    const { name, email } = userProf;

    res.json({
        user: {
            _id,
            name,
            email,
        },
    });
});

//reset password endpoint
router.post("/reset-password", resetPassReqValidation, async (req, res) => {
	const { email } = req.body;

	const user = await getUserByEmail(email);

	if (user && user._id) {
		/// crate// 2. create unique 6 digit pin
		const setPin = await setPasswordResetPin(email);
		await emailProcessor({
			email,
			pin: setPin.pin,
			type: "request-new-password",
		});
	}

	res.json({
		status: "success",
		message:
			"If the email is exist in our database, the password reset pin will be sent shortly.",
	});
});

//reset password validations
router.patch("/reset-password", updatePassValidation, async (req, res) => {
	const { email, pin, newPassword } = req.body;

	const getPin = await getPinByEmailPin(email, pin);
	// 2. validate pin
	if (getPin?._id) {
		const dbDate = getPin.addedAt;
		const expiresIn = 1;

		let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);

		const today = new Date();

		if (today > expDate) {
			return res.json({ status: "error", message: "Invalid or expired pin." });
		}

		// encrypt new password
		const hashedPass = await hashPassword(newPassword);

		const user = await updatePassword(email, hashedPass);

		if (user._id) {
			// send email notification
			await emailProcessor({ email, type: "update-password-success" });

			////delete pin from db
			deletePin(email, pin);

			return res.json({
				status: "success",
				message: "Your password has been updated",
			});
		}
	}
	res.json({
		status: "error",
		message: "Unable to update your password. plz try again later",
	});
});


router.delete("/logout", userAuthorization, async (req, res) => {
    const { authorization } = req.headers
    //this data coming from database

    const _id = req.userId

    //delete accessJWT from redis database

    deleteJWT(authorization);
    //delete freshjwt from mongodb
    const result = await storeUserRefreshJWT(_id, '')

    if (result._id) {
        return res.json({ status: "success", message: "Logged out successfully" });
    }

    res.json({
        status: "error",
        message: "Unable to logg you out, plz try again later",
    });
})



module.exports = router