'use strict';
import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

dotenv.config();

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const user = await User.findOne({username});
            if (user === undefined) {
                return done(null, false, { message: 'Undefined.' });
            }
            if (!(await bcrypt.compare(password, user.Password))) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            const userNoPass = user.toObject();
            delete userNoPass.Password;
            return done(null, userNoPass, { message: 'Logged In Successfully' }); 
        } catch (err) {
            return done(err, false, { message: 'Error during Logging in'});
        }
    })
);

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    },
    (jwtPayload, done) => {
        if (jwtPayload) {
            return done(null, { ...jwtPayload }, { message: 'Works.' });
        }
        return done(null, false, { message: 'No JWTpayload.' });
    }
));

export default passport;
