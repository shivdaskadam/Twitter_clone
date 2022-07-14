//your app queries come here
module.exports = {
    sql : {
       INSERT: { 
           REGISTER: `insert into Users(name,email,password) values("{name}","{email}","{password}");`
       },
       UPDATE: { },
       SELECT: {
           LOGIN : `select name,id from Users where email="{email}" and password="{password}"`
        }
    },
    mongo : {
      
    }
};