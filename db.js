require('dotenv').config()
const dbCon = require('mysql').createConnection({host : process.env.HOST, user : process.env.USER, password : process.env.PWD, database : process.env.DATABASE})
const uuid = require('uuid')


module.exports = {
    addNewUser : (user)=>{
        return new Promise((resolve, reject)=>{
            dbCon.query(`INSERT INTO users VALUES(NULL, ${dbCon.escape(user.username)}, ${dbCon.escape(user.email)}, ${dbCon.escape(user.pwd)}, NULL);`, (error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve()
                }
            })
        })
    },
    logUser : (user)=>{
        return new Promise((resolve, reject)=>{
            dbCon.query(`SELECT * FROM users WHERE email LIKE ${dbCon.escape(user.email)} AND pwd LIKE ${dbCon.escape(user.pwd)};`, (error, result)=>{
                if(error){
                    reject('db error')
                }else{
                    if(result.length <= 0){
                        reject('account error')
                    }else{
                        let token = `${uuid.v4()}${uuid.v4()}`
                        dbCon.query(`UPDATE users SET token = '${token}' WHERE email LIKE ${dbCon.escape(user.email)} AND pwd LIKE ${dbCon.escape(user.pwd)};`,(error)=>{
                            if(error){
                                reject('db error')
                            }else{
                                resolve({token : token, username : result[0].username})
                            }
                        })
                    }
                }
            })
        })
    },
    logout : (token)=>{
        return new Promise((resolve, reject)=>{
            dbCon.query(`UPDATE users SET token = NULL WHERE token LIKE ${dbCon.escape(token)};`,(error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve()
                }
            })
        })
    }
}