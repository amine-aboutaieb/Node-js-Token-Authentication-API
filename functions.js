
module.exports = {
    createResponse : (boolean, msg, token)=>{
        return {
            error : boolean,
            message : msg,
            token : token
        }
    },
    createAuthResponse : (boolean, msg, username, token)=>{
        return {
            error : boolean,
            message : msg,
            username : username,
            token : token
        }
    }
}