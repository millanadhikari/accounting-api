const { UserSchema } = require('./User.schema')


const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch(error => reject(error));


  })

}

const getUserByEmail = email => {
  return new Promise((resolve, reject) => {
    if (!email) return false
    try {
      UserSchema.findOne({ email }, (error, data) => {
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

const storeUserRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate({ _id }, {
        $set: {
          "refreshJWT.token": token,
          "refreshJWT.addedAt": Date.now()
        }
      },
        { new: true }
      )
        .then((data) => resolve(data));
      // .catch((error) => reject(error))

    } catch (error) {
      reject(error)
    }
  })
}

const getUserById = async (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false
    try {
      UserSchema.findOne({ _id }, (error, data) => {
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

const updatePassword = (email, newhashedPass) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { email },
        {
          $set: { password: newhashedPass },
        },
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
};

const updateUserbySuperAdmin = ({ _id, userId, name, email, phone, password, isSuperAdmin, isTeam }) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { _id },
        { $set: { name: name, email: email, phone: phone, password: password, isSuperAdmin: isSuperAdmin, isTeam: isTeam } },
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

const verifyUser = (_id, email) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { _id, email, isVerified: false },
        {
          $set: { isVerified: true },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

const getAllUsers = async (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.find(keyword, {
          name: 1, email: 1, phone: 1, isSuperAdmin: 1, isTeam: 1
        }
  
      )
        .then((data) => {
          console.log(data)
          resolve(data)
        })
        .catch((error) => reject(error))
    } catch (error) {
      reject(error)
    }

  })
}




module.exports = {
  insertUser,
  getUserByEmail,
  storeUserRefreshJWT,
  getUserById,
  updatePassword,
  verifyUser,
  getAllUsers,
  updateUserbySuperAdmin

}