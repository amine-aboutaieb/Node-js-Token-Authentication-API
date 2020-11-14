const express = require('express')
const router = express.Router()
const db = require('./db')
const funcs = require('./functions')

router.post('/user/add', (req,res)=>{
    db.addNewUser(req.body).then(()=>{
        res.json(funcs.createResponse(false, 'success'))
    }).catch((error)=>{
        console.log(error)
        res.json(funcs.createResponse(true, 'error'))
    })
})

router.post('/user/login', (req, res)=>{
    db.logUser(req.body).then((response)=>{
        res.json(funcs.createAuthResponse(false, 'Loged in successfully', response.username, response.token))
    }).catch((error)=>{
        if(error == "db error"){
            res.json(funcs.createResponse(true, 'A server error has occurred'))
        }else if(error == "account error"){
            res.json(funcs.createResponse(true, 'This account does not exist'))
        }
    })
})

router.post('/user/logout', (req, res)=>{
    db.logout(req.body.token).then(()=>{
        res.json(funcs.createResponse(false, 'success'))
    }).catch((error)=>{
        console.log(error);
        res.json(funcs.createResponse(true, 'A server error has occurred'))
    })
})



module.exports = router
