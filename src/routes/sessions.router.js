import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const router = Router();

router.post('/register', passport.authenticate('register', { session: false, failureRedirect: '/api/sessions/failedregister' }), (req, res) => {
    res.send({ status: "ok", payload: req.user })
})
router.get('/failedregister', (req, res) => {
    console.log("Oops");
})

router.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    const loginUser = {
        role: req.user.role,
        name: req.user.name,
        email: req.user.email
    }
    const token = jwt.sign(loginUser, config.jwt.SECRET, { expiresIn: 300 })
    res.cookie(config.jwt.COOKIE, token, { maxAge: 300000, httpOnly: true }).send({ status: "success", message: "Logged in!" })
})

router.get('/current', (req, res) => {
    try {
        const token = req.cookies[config.jwt.COOKIE];
        if (!token) return res.redirect('/');
        const user = jwt.verify(token,config.jwt.SECRET);
        res.send({status:"success",user})
    } catch (error) {
        if(error.expiredAt){
            return res.send({status:"error",error:"Token expirado"})
        }
    }
})
export default router;