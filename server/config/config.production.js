module.exports ={
    "transitApiUrl":"https://platform.whereismytransport.com/api",
    "transitapiScopes": "transitapi:all",
    "identityStsUrl": "https://identity.whereismytransport.com",
    "client" : {
        "id" : process.env.CLIENT_ID,
        "secret" : process.env.CLIENT_SECRET
    }
}