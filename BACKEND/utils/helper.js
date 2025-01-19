const jwt=require('jsonwebtoken');
exports={}

exports.getToken=async (email,User)=>{
        const token=jwt.sign({identifier: User._id},"ThiskeyisSecretOrPrivate");
        return token;
};

module.exports=exports.getToken;