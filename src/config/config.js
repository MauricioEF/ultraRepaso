export default {
    app:{
        DOMAIN:process.env.SELF_DOMAIN
    },
    mongo:{
        DATABASE:process.env.MONGO_DATABASE,
        USER:process.env.MONGO_USER,
        PASSWORD:process.env.MONGO_PWD
    },
    jwt:{
        SECRET:process.env.JWT_SECRET,
        COOKIE:process.env.JWT_COOKIE
    },
    auth:{
        google:{
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET
        }
    }
}