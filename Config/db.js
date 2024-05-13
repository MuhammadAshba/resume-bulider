const mongoose = require('mongoose');


const connectDB= ()=> {


try {
    mongoose.connect('mongodb://localhost:27017/resumebuilder').then((con)=>{

                console.log(`ResumeBuilder Database is Connected`)
    })
     
} catch (error) {
                console.log(`Error in Database`)
}

}

module.exports= connectDB;