const users=[]
const Register=(req,res)=>{
    users.push(req.body)
    console.log(users);
    res.send('Data received')
}
const Login=(req,res)=>{
    const {email,password}=req.body 
    const userEmail=users.find((user)=>user.email===email)
    const userPwd=users.find((user)=>user.password===password)  
    if(userEmail && userPwd){
        res.send('Login Successful')
    }
    else if(!userEmail){
        res.send('Email not found')
    }    
    else if(!userPwd){
        res.send('Password not found')
    }
}
module.exports.Register=Register
module.exports.Login=Login  