const authMiddleWare =  (req , res, next) => {
const token = "xy";
const isAdmin = token==="xyz";

if(!isAdmin){
    throw new Error("you are not user");
}
next();
}

module.exports = { 
    authMiddleWare
}