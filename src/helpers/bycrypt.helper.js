

const bycrypt = require('bcrypt')
const saltRounds = 10;


const hashPassword = plainPassword => {
    return new Promise((resolve, reject) => {
        resolve(bycrypt.hashSync(plainPassword, saltRounds))
    })
}

const comparePassword = (plainPass, passFromDb) => {
    return new Promise((resolve, reject) => {
        bycrypt.compare(plainPass, passFromDb, function (err, result) {
            if(err) reject(err)
            resolve(result)
        })
    })
}


module.exports = {
    hashPassword,
    comparePassword,
}