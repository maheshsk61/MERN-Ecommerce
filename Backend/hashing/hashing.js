const bcrypt = require('bcryptjs');
const saltRounds = 10//Number of rounds to generate salt
const generator = async (plainpassword) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)//Generate salt
        const hash = await bcrypt.hash(plainpassword, salt)//Generate hash using plainpassword and salt 
        return hash
    }
    catch (e) {
        console.log(e)
    }
}
const validate = async (plainpassword,hash) => {
    try {
        const compare=await bcrypt.compare(plainpassword,hash)//Compare plainpassword with hash
        return compare
    }
    catch (e) {
        console.log(e)
    }
}
module.exports.generator = generator
module.exports.validate = validate