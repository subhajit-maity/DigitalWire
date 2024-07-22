const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose connection string like :-> mongodb://localhost:27017/Paytm paste it here
mongoose.connect('', {
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


const userSchema= new Schema({
    username:{type:String},
    firstname:{type:String},
    lastname:{type:String},
    password:{type:String},
    email:{type:String},
});
const accountsSchema=new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:true,
    },
    balance:{type:Number,
    required:true}
});

const Account=mongoose.model('Account',accountsSchema); 
const users=mongoose.model('users',userSchema);


 
module.exports={
    users,
    Account
}