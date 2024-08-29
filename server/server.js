import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import User from './model/User.js';  
import routes from './routes/Routes.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));



mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed", error);
    });


AdminJS.registerAdapter(AdminJSMongoose.default || AdminJSMongoose);

const adminJs = new AdminJS({
    resources: [
        { resource: User, options: {} },
    ],
    rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const ADMIN = {
            email: 'admin@gmail.com',
            password: '1234',
        };
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN;
        }
        return null;
    },
    cookieName: 'adminjs',
    cookiePassword: 'sessionsecret',
    resave: false, 
    saveUninitialized: false, 
});

app.use('/api', routes);


app.use(adminJs.options.rootPath, adminRouter);

app.get('/', (req, res) => {
    res.send('Welcome! Backend is up and running.');
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
