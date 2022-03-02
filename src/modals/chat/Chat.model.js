const { ChatSchema } = require('./Chat.schema')
const { UserSchema } = require('../user/User.schema')
const asyncHandler = require("express-async-handler");

// const accessChat = () => {
//     return new Promise((resolve, reject) => {
//         var isChat = await ChatSchema.find({
//             isGroupChat: false,
//             $and: [
//               { users: { $elemMatch: { $eq: req.user._id } } },
//               { users: { $elemMatch: { $eq: userId } } },
//             ],
//           })
//             .populate("users", "-password")
//             .populate("latestMessage");

//           isChat = await UserSchema.populate(isChat, {
//             path: "latestMessage.sender",
//             select: "name pic email",
//           });

//           if (isChat.length > 0) {
//             resolve.send(isChat[0]);
//           } else {
//             var chatData = {
//               chatName: "sender",
//               isGroupChat: false,
//               users: [req.user._id, userId],
//             }
//             try {
//                 const createdChat = await ChatSchema.create(chatData);
//                 const FullChat = await ChatSchema.findOne({ _id: createdChat._id }).populate(
//                   "users",
//                   "-password"
//                 );
//                 resolve.json(FullChat);
//               } catch (error) {
//                 reject(error);
//                 throw new Error(error.message)
//               }
//             }
//           });

// const accessChat = asyncHandler(async (req, res) => {
//     const { userId } = req.body;

//     if (!userId) {
//         console.log("UserId param not sent with request");
//         return res.sendStatus(400);
//     }

//     var isChat = await ChatSchema.find({
//         isGroupChat: false,
//         $and: [
//             { users: { $elemMatch: { $eq: req.user._id } } },
//             { users: { $elemMatch: { $eq: userId } } },
//         ],
//     })
//         .populate("users", "password")
//         .populate("latestMessage");

//     isChat = await UserSchema.populate(isChat, {
//         path: "latestMessage.sender",
//         select: "name pic email",
//     });

//     if (isChat.length > 0) {
//         res.send(isChat[0]);
//     } else {
//         var chatData = {
//             chatName: "sender",
//             isGroupChat: false,
//             users: [req.user._id, userId],
//         };

//         try {
//             const createdChat = await ChatSchema.create(chatData);
//             const FullChat = await ChatSchema.findOne({ _id: createdChat._id }).populate(
//                 "users",
//                 "-password"
//             );
//             res.status(200).json(FullChat);
//         } catch (error) {
//             res.status(400);
//             throw new Error(error.message);
//         }
//     }
// });

// const getCustomerByEmail = email => {
//     return new Promise((resolve, reject) => {
//         if(!email) return false
//         try {
//             CustomerSchema.findOne({email}, (error, data) => {
//                 if(error) {
//                     console.log(error)
//                    reject(error)
//                 }
//                 resolve(data)
//                 });
//         } catch (error) {
//             reject(error)
//         }

//     })
//     }

//     const getCustomers = (clientId) => {
//         return new Promise ((resolve, reject) => {
//             try { 
//                 CustomerSchema
//                     .find({}, {name:1, email:1, phone:1})
//                     .then((data) => {
//                         resolve(data)
//                     })
//                     .catch((error) => reject(error))

//             } catch (error) {
//                 reject(error)
//             }
//         })
//     }

//     // const storeUserRefreshJWT = (_id, token) => {
//     //     return new Promise((resolve, reject) => {
//     //         try{
//     //             CustomerSchema.findOneAndUpdate({_id},{
//     //                 $set:{"refreshJWT.token":token, 
//     //                 "refreshJWT.addedAt":Date.now()}},
//     //                 {new:true}
//     //             )
//     //                 .then((data) => resolve(data));
//     //                 // .catch((error) => reject(error))

//     //         } catch (error) {
//     //             reject(error)
//     //         }
//     //     })
//     // }

//     const getCustomerById = async (_id) => {
//         return new Promise((resolve, reject) => {
//             if(!_id) return false
//             try {
//                 CustomerSchema.findOne({_id}, (error, data) => {
//                     if(error) {
//                         console.log(error)
//                        reject(error)
//                     }
//                     resolve(data)
//                     });
//             } catch (error) {
//                 reject(error)
//             }
//         })
//         }

//         // const verifyUser = (_id, email) => {
//         //     return new Promise((resolve, reject) => {
//         //       try {
//         //         UserSchema.findOneAndUpdate(
//         //           { _id, email, isVerified: false },
//         //           {
//         //             $set: { isVerified: true },
//         //           },
//         //           { new: true }
//         //         )
//         //           .then((data) => resolve(data))
//         //           .catch((error) => {
//         //             console.log(error.message);
//         //             reject(error);
//         //           });
//         //       } catch (error) {
//         //         console.log(error.message);
//         //         reject(error);
//         //       }
//         //     });
//         //   };



module.exports = {
    // accessChat,
    // getCustomerByEmail,
    // getCustomerById,
    // getCustomers,

}