const pgp = require('pg-promise')({})
const db = pgp('postgress://localhost/blog')

const userService = {}


userService.create = (id, username,email,password, token)=>{
return db.none(`INSERT INTO users (id, username,email,password, token) VALUES (${username}, ${email},${password})`,{name,email,password})
}

userService.read = (id)=>{
return db.one(`SELECT * FROM users WHERE id=${id}`,{id})
}

userService.update = (id,name,email,password,token=null) =>{
    const arr = [username,email,password,token]
    const arrString = ["username","email","password","token"]
    letsqlSr = 'UPDATE users SET '
    let emptystr = ''
    arr.forEach((element,i) =>{
        if(element){
            emptystr += arrString[i]+ '=${'+ arrString[i] + '},'
        }
    })
    emptystr.slice(0,emptystr.length - 1)
//    username=${username}
    sqlStr = sqlStr + emptystr 
        //UPDATE
    sqlStr = sqlStr + ` WHERE id=${id}`
    return db.none(sqlStr,{id,username,email,password,token})
}

userService.delete = (id) =>{
    return db.none(`DELETE FROM user WHERE id =${id}`,{id})
}

userService.allUsers = ()=>{
    return db.any('SELECT * FROM users')
}

console.log(userService)

module.exports = userService;