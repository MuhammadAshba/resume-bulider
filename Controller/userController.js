
const User=require('../Models/user')
// const jwt= require('jsonwebtoken')
// const token = jwt.sign({key:"key1223*()&^%$#@!"}, 'adkdhffsdhfuwefhwe013233257#$%^&*(()(*&^%%$$$$$##@&&***^%$##@#^&')
// const bcrypt= require('bcryptjs')






exports.userLogin=async(req,res)=>{
    console.log(req.body);
    const email= req.body.email;
    const password= req.body.password;
    // const user = await User.findOne({email:email})
    // // if(user.password === password){
    // //     return user
    // // }

    const user = await User.findOne({email:email});
    console.log("user", user);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.send({data:user, message: "User login successfully"})

}





exports.userSignup=async(req,res)=>{


    const userbody =req.body;
    // console.log(userbody)
    // const Password= await bcrypt.hash( body.password,9 )
  
   

                
     try {
        await User.create(userbody)

            res.json({
                code : 200,
                Message:"Signup Successfull",
                Success: true,



            })

    } catch (error) {

        console.log(error)
         res.json({
            Message: "There has been Error"
         })
    }

}