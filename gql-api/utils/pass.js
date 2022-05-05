'use strict';
import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

dotenv.config();

passport.use(
    new Strategy({ usernameField: "Username", passwordField: "Password"}, async (Username, Password, done) => {
        try {
            const userToFind = await User.findOne({ Username });
            if (userToFind === null) {
                return done(null, false, { message: 'Undefined.' });
            }
            if (!(await bcrypt.compare(Password, userToFind.Password))) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            const user = userToFind.toObject();
            delete user.Password;
            return done(null, user, { message: 'Logged In Successfully' }); 
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
    async (jwtPayload, done) => {
        if (jwtPayload) {
            return done(null, { ...jwtPayload }, { message: 'Works.' });
        }
        return done(null, false, { message: 'No JWTpayload.' });
    }
));

export default passport;
