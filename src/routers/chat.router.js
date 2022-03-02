const express = require('express');
const { userAuthorization } = require('../middlewares/authorization.middleware');
const { accessChat } = require('../modals/chat/Chat.model');
const router = express.Router();

router.all('/', (req, res, next) => {
    next()
})


//@description     Create or fetch One to One Chat
//@route           POST /v1/chat/
//@access          Protected
// router.post('/', userAuthorization, async (req, res) => {
//     const userId = req.userId
   
//     try {

//         const result = await accessChat()
//         console.log(result)
//         res.json({ message: "Access chats", result })
//     } catch (error) {
//         console.log(error);
//         res.json({ status: "error", message: error.message })
//     }




// })
module.exports = router