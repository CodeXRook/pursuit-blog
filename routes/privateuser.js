const express = require ('express')
const bcrypt = require('bcrypt')
const userService = require('/service/user')
const app= express()


app.put('/:user_id',(req,res)=>{
    const {user_id} = req.params
    const {username,email,password} = req.body
    //console.log('email entered : ', email)
    if(!password){
        userService.update(user_id,username,password,email)
        .then(()=>{
            return userService.read(user_id)
        })
        .then((response)=>{
            delete response.token
            res.json(response)
        })
        .catch(err=>{
            res.json(err.toString())
        })
        
    }
    else if(password){
        bcrypt.hash(password,10)
        .then((encryptedPassword)=>{
            userService.update(user_id,username,encryptedPassword,email)
            .then(()=>{
                return userService.read(user_id)
            },err=>{
                throw new Error('could not update')
            })
            .then((response)=>{
                delete response.token
                res.json(response)
            },err=>{
                throw new Error('could not read')
            })
        })
        .catch(err=>{
            res.json(err.toString())
        })
    }
})

app.delete('/:user_id',(req,res)=>{
    const {user_id} = req.params
    userService.delete(user_id)
    .then(()=>{
        res.send(`Deleted user with ID:${user_id} `)
    })
    .catch(err=>{
        res.send(err.toString())
    })
})

module.exports = {
    privateuserApp :app
}

