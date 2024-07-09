const { generator, validate } = require('../hashing/hashing')
const users = []
const Register = async (req, res) => {
    const hashed = await generator(req.body.password)
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            createPassword: hashed,
            confirmPassword: hashed
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
    try {
        const { email, password } = req.body
        const user = users.find((user) => user.email === email)
        const pwd= users.find((user) => user.password === password)
        if (user) {
            console.log(password);
            console.log(user.createPassword);
            const isMatch = await validate(password, user.createPassword)
            if (isMatch) {
                res.send('Login Successful')
            }
            else if (!isMatch) {
                res.send('Password not found')
            }
        }
        else if(!user && pwd!==undefined){
            res.send('Email not found')
        }
        else if(user && pwd===undefined){
            res.send('Password not found')
        }
        else{
            res.send('Invalid Credentials')
        }
    }
    catch (e) {
        console.log(e);
    }
}
module.exports.Register = Register
module.exports.Login = Login  