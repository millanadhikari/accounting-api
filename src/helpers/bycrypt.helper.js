

// const bycrypt = require('bcrypt-nodejs')
const bcrypt = require('bcrypt');

const hashPassword = plainPassword => {
    const saltRounds = 10
    return new Promise((resolve, reject) => {
        // resolve(bycrypt.hash(plainPassword, saltRounds, null, function(err, result) {}))
        // bycrypt.genSalt(10, function (saltRounds) {
        //     bycrypt.hash(plainPassword, saltRounds, null, function (err, hashPassword) {
        //         if(err) reject (err)
        //         resolve(hashPassword)
        //     })
        // })

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
                if(err) reject(err)
                resolve (hash)
            });
        });
    })
}

const comparePassword = (plainPass, passFromDb) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, passFromDb, function (err, result) {
            if (err) reject(err)
            resolve(result)
        })
    })
}


module.exports = {
    hashPassword,
    comparePassword,
}