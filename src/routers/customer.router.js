const express = require('express')
const router = express.Router();
const { insertCustomer, getCustomerByEmail, getCustomerById, getCustomers, updateCustomerById } = require("../modals/customer/Customer.model")
const { userAuthorization } = require("../middlewares/authorization.middleware")

router.all('/', (req, res, next) => {
    next()
})

// Get customer profile routers
// router.get("/", userAuthorization, async (req, res) => {
//     //this data coming from database

//     const _id = req.userId

//     const userProf = await getCustomerById(_id)
//     const { name, email } = userProf;

//     res.json({
//         user: {
//             _id,
//             name,
//             email,
//         },
//     });
// });



//Create Customers
router.post('/', userAuthorization, async (req, res) => {
    const { name, phone, email } = req.body
    const userId = req.userId
    const newUserObj = {
        clientId: userId,
        name,
        phone,
        email,

    }
    try {

        const result = await insertCustomer(newUserObj)
       if(result._id) {
        res.json({ message: "New customer created", result })
       }
    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: error.message })
    }




})

//Get all Customer

router.get("/all",  async (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
 
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
     try {
       const userId = req.userId;
       const result = await getCustomers(userId);
 
 
       next = {
           page:page * 1 + 1,
           limit : limit,
          
       }
 
       previous = {
         page:page - 1,
         limit : limit,
        
     }
       paginatedResults = result.slice(startIndex, endIndex)
       totalPages = Math.ceil(result.length / limit)
       
       return res.json({
         status:"success",
         next,
         totalPages,
         previous,
         paginatedResults
       });
     } catch (error) {
       res.json({ status: "error", message: error.message });
     }
   });

   //Update Customer by customer_id

   router.patch("/update-customer/:_id", async (req, res) => {
     try {
        const {_id} = req.params
        const userID = req.userID

        const { name, email, phone, } = req.body

        const result = await updateCustomerById({_id, name, email, phone})

        if (result._id) {
          return res.json({
              status: "Success", message: "Customer has been Updated."
          })
      }

     } catch (error) { 
       res.json({status:"error", message:error.message});
     }
   })
// router.delete("/logout", userAuthorization, async (req, res) => {
//     const { authorization } = req.headers
//     //this data coming from database

//     const _id = req.userId

//     //delete accessJWT from redis database

//     deleteJWT(authorization);
//     //delete freshjwt from mongodb
//     const result = await storeUserRefreshJWT(_id, '')

//     if (result._id) {
//         return res.json({ status: "success", message: "Logged out successfully" });
//     }

//     res.json({
//         status: "error",
//         message: "Unable to logg you out, plz try again later",
//     });
// })





module.exports = router