const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')




const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:[true,'Email is required'],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,"Invalid email address"],
        unique:true
    },
    name:{
        type:String,
        required:[true,'Name is required ']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password must be at least 6 characters long'],
        select:false
    },
    systemUser:{ // inorder to diff. normal user with system user a special property(by default consider as normal user but if he is system user then he has access to database can modify from normal user to system user )
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }

},{
    timestamps:true

})

userSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword=async function(password){

    return await bcrypt.compare(password,this.password) // compare the provided password with the hashed password in the database

}

const userModel = mongoose.model('user',userSchema)

module.exports = userModel