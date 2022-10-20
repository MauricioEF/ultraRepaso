import passport from "passport";
import local from 'passport-local';
import usersModel from "../dao/users.dao.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email', session:false}, async (req, email, password, done) => {
        try {
            const { name } = req.body;
            const exists = await usersModel.findOne({ email });
            if (exists) return done(null, false);
            let newUser = {
                name,
                email,
                image: "aquí la url de una imagen",
                password: createHash(password),
            }
            let result = await usersModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }))
    passport.use('login',new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        try{
            const user = await usersModel.findOne({email});
            if(!user) return done(null,false);
            if(!isValidPassword(user,password)) return done(null,false);
            return done(null,user);
        }catch(error){
            done(error);
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser(async(id,done)=>{
        const user = await usersModel.findOne({_id:id});
        done(null,user);
    })
}
export default initializePassport;