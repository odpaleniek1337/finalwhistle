'use strict';
import express from 'express';
import connectMongo from './utils/db.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/index.js';
import resolvers from './resolvers/index.js';
import { checkAuth } from './utils/auth.js';

dotenv.config();

const isProd = process.env.PROJECTSTAGE === 'Production';
const port = process.env.PORT || 3000;

(async () => {
    try {
        const conn = await connectMongo();
        const app = express();

        if (conn) {
            console.log('Connected successfully.');
        } else {
            throw new Error('db not connected 🤬');
        }
        
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: async ({req, res}) => {
                if (req) {
                  const user = await checkAuth(req, res);
                  return {
                    req,
                    res,
                    user,
                  };
                }
              },
        });

        app.use(helmet({
            crossOriginEmbedderPolicy: isProd,
            contentSecurityPolicy: isProd,
          }));
        
        await server.start();

        server.applyMiddleware({ app });
        
        app.listen(port, () => {
            console.log('Hey, listening here');
        });
        
    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();
