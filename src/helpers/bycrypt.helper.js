

const bycrypt = require('bcrypt-nodejs')


const hashPassword = plainPassword => {
    return new Promise((resolve, reject) => {
        // resolve(bycrypt.hash(plainPassword, saltRounds, null, function(err, result) {}))
        bycrypt.genSalt(10, function (saltRounds) {
            bycrypt.hash(plainPassword, saltRounds, null, function (err, hashPassword) {
                resolve(hashPassword)
            })
        })
    })
}

const comparePassword = (plainPass, passFromDb) => {
    return new Promise((resolve, reject) => {
        bycrypt.compare(plainPass, passFromDb, function (err, result) {
            if (err) reject(err)
            resolve(result)
        })
    })
}


module.exports = {
    hashPassword,
    comparePassword,
}