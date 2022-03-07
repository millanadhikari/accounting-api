const { CustomerSchema } = require('./Customer.schema')


const insertCustomer = (userObj) => {
    return new Promise((resolve, reject) => {
        try {
            CustomerSchema(userObj)
                .save()
                .then((data) => resolve(data))
                .catch(error => reject(error));
        } catch (error) {
            reject(error)
        }


    })

}

const getCustomerByEmail = email => {
    return new Promise((resolve, reject) => {
        if (!email) return false
        try {
            CustomerSchema.findOne({ email }, (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error)
                }
                resolve(data)
            });
        } catch (error) {
            reject(error)
        }

    })
}

const getCustomers = (clientId) => {
    return new Promise((resolve, reject) => {
        try {
            CustomerSchema
                .find({}, { name: 1, email: 1, phone: 1 })
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => reject(error))

        } catch (error) {
            reject(error)
        }
    })
}


const updateCustomerById = ({ _id, name, email, phone }) => {
    return new Promise((resolve, reject) => {
        try {
            CustomerSchema.findOneAndUpdate(
                { _id },
                { $set: { name: name, email: email, phone: phone } },
                { new: true }
            )
                .then((data) => resolve(data))
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

// const storeUserRefreshJWT = (_id, token) => {
//     return new Promise((resolve, reject) => {
//         try{
//             CustomerSchema.findOneAndUpdate({_id},{
//                 $set:{"refreshJWT.token":token, 
//                 "refreshJWT.addedAt":Date.now()}},
//                 {new:true}
//             )
//                 .then((data) => resolve(data));
//                 // .catch((error) => reject(error))

//         } catch (error) {
//             reject(error)
//         }
//     })
// }

const getCustomerById = async (_id) => {
    return new Promise((resolve, reject) => {
        if (!_id) return false
        try {
            CustomerSchema.findOne({ _id }, (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error)
                }
                resolve(data)
            });
        } catch (error) {
            reject(error)
        }
    })
}

// const verifyUser = (_id, email) => {
//     return new Promise((resolve, reject) => {
//       try {
//         UserSchema.findOneAndUpdate(
//           { _id, email, isVerified: false },
//           {
//             $set: { isVerified: true },
//           },
//           { new: true }
//         )
//           .then((data) => resolve(data))
//           .catch((error) => {
//             console.log(error.message);
//             reject(error);
//           });
//       } catch (error) {
//         console.log(error.message);
//         reject(error);
//       }
//     });
//   };



module.exports = {
    insertCustomer,
    updateCustomerById,
    getCustomerByEmail,
    getCustomerById,
    getCustomers,

}