const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//  define person schema 

const userSchema = new mongoose.Schema(
    {
        name:{
            type : String ,
            required : true
        },
        age:{
            type : Number,
            required: true
        },
        email:{
            type :String
        },
        mobile:{
            type:String
        },
        address:{
            type : String,
            required:true
        },
        nagritaCardNumber:{
            type:String ,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['voter','admin'],
            default:'voter',
        },
        isvoted:{
            type:Boolean,
            default:false
        }
       
    }
)

userSchema.pre('save', async function(next){
    const user = this;
    // hash the password only if it has been modified(or is new);
    if(!user.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        
        // hash password
        const hashedPassword = await bcrypt.hash(user.password,salt);

        // override the password with the hashed password 

        user.password = hashedPassword ;

        next();
    }catch(err){
        return next(err);
    }
})

    userSchema.methods.comparePassword = async function (userPassword) {
        try {
            // use bcrypt to comapre the provided password with the hashed password 
            const isMatch = await bcrypt.compare(userPassword,this.password);
            return isMatch;
        } catch (error) {
            
        }
    }


//  create person model
const User = mongoose.model('User',userSchema);
module.exports = User;