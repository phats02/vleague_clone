const db=require('./db')
module.exports={
    checkSignIn:(username,password)=>{
        return (username=='admin' && password=="admin")
    }
}