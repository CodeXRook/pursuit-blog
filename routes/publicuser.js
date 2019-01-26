const express = require('express')
const userService = require('../services/user')
const app = express();
const bcrypt = require('bcrypt');
const uuid = require('uuid/v1');


app.get('/:id',(req,res)=>{
    const{id} = req.params
    userService.read(user_id).then(response=>{
        delete response.token
        res.json(response)
    },err=>{
        throw new Error('User does not exist')
    })
    .catch(err=>{
        res.json(err.toString())
    })
})

app.post('/login',(req,res)=>{
    let {id,username,password} = req.body
    if(!id || !username || !password) res.json({Error: 'Must enter id,username,password'})
    userService.read(id)
    .then(data=>{   
        if(username != data.username) throw new Error('Incorrect username')
        return bcrypt.compare(password,data.password)
    },err=>{
        throw new Error('username does not exist')
    })
    .then(response=>{
        if(!response) throw new Error('Password is incorrect')
        return userService.read(user_id)
        
    })
    .then((data)=>{
        if(data.token) throw new Error('Already logged in')
        const tokenn = uuid();
        
        userService.update(id,username=null,password=null,email=null,tokenn)
        res.json({status:'login Success',tokenn})
    })
    .catch(err=>{
        res.json(err.toString())
    })
})


app.post('/',req,res)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password) res.json({Error: 'Missing username, email, or password'})
    bcrypt.hash(password,7)
        .then((encryptedPassword)=>{
            userService.create(username,email,encryptedPassword)
                .then(()=>{
                    res.json({username,email,encryptedPassword})
                })
        })
    }
module.exports = {
    publicuserApp : app
}