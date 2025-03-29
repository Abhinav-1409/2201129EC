// const jwt = require('jsonwebtokens');
async function checkAuth(req, res, next) {
    const token = req.cookies?.token;
    // const user = jwt.verify(token, secretKey);
    const user = "Abhinav";
    if(!user){
        res.response({status: 403, message: "Not Authenticated"});
    }
    req.user = user;
    next();
}
module.exports = checkAuth;