import jwt from 'jsonwebtoken';
import passport from './pass.js';
import dotenv from 'dotenv';

dotenv.config();

const login = (req) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('login', err, user, info);
            if (err || !user) {
                reject(info);
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    const Token = jwt.sign(user, process.env.JWT_SECRET);
                    resolve({...user, Token, id: user._id});
                }
            });
        })(req);
    });
};

const checkAuth = (req) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err || !user) {
                resolve(false);
            } else {
                resolve(user);
            }
        })(req);
    });
}

export { checkAuth, login };