const userServices = require('../services/user')

const loginChecker = (req,res,next) => {
    const {id} = req.headers
    
    
    userServices.read(user_id) // reslove(response) or reject
        .then((response)=>{
            console.log(response)
            console.log(req.headers['token'])
            const headersToken = req.headers['token']
            if(headersToken === dbToken)
            next()
            else res.json('token incorrect')
        })
        .catch(err=>{
            res.json(errr.toString())
        })
             
        .catch(err=>{
            res.json(err.toString())
        })

    }

module.exports = {
    loginChecker
}
