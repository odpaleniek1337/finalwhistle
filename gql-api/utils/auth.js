import jwt from 'jsonwebtoken';
import passport from './pass.js';
import dotenv from 'dotenv';

dotenv.config();

const login = (req) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('login', err, user, info);
            if (err || !user) {
                reject(info.message);
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    reject(err);
                }
                const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "12h" });
                console.log(user, token);
                resolve({...user, token, id: user._id});
            });
        })(req);
    });
};

const checkAuth = (req) => {
    return new Promise((resolve) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                resolve(false);
            }
            resolve(user);
        })(req);
    });
}

export { checkAuth, login };