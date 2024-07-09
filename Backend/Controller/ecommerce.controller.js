const { generator, validate } = require('../hashing/hashing')
const users = []
const Register = async (req, res) => {
    const hashed = await generator(req.body.password)
    try {
        const newUser={
            name:req.body.name,
            email:req.body.email,
            createPassword:hashed,
            confirmPassword:hashed
        }
        users.push(newUser)
        console.log(newUser);
        res.send(`Hi ${req.body.name} you have Registered Successfully`)
    }
    catch (e) {
        console.log(e);
    }
}
const Login = async (req, res) => {
    const isMatch = await validate(req.body.password, hash)
    try {
        const { email, password } = req.body
        const userEmail = users.find((user) => user.email === email)
        const userPwd = users.find((user) => user.password === password)
        if (userEmail && userPwd) {
            res.send('Login Successful')
        }
        else if (!userEmail && !userPwd) {
            res.send('Email and Password not found')
        }
        else if (!userEmail) {
            res.send('Email not found')
        }
        else if (!userPwd) {
            res.send('Password not found')
        }
    }
    catch (e) {
        console.log(e);
    }
}
module.exports.Register = Register
module.exports.Login = Login  