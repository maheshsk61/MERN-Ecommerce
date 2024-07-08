const users = []
const Register = (req, res) => {
    try {
        users.push(req.body)
        console.log(users);
        res.send(`Hi ${req.body.name} you have Registered Successfully`)
    }
    catch (e) {
        console.log(e);
    }
}
const Login = (req, res) => {
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