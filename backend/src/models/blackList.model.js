const mongoose= require("mongoose")


const tokenBlacklistSchema= new mongoose.Schema({
    token:{
        type:String,
        required:[true,"TOken is required to blacklist"],
        unique:[true,"TOken is already balckelisted"]
    }
    
},{
    timestamps:true
})

tokenBlacklistSchema.index({createdAt:1},{
    expireAfterSeconds: 60 * 60 * 24 * 3 //3 days
})


const tokenBlackListModel = mongoose.model("tokenBlackList",tokenBlacklistSchema)

module.exports=tokenBlackListModel