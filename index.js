import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import enrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import PeopleRoutes from "./Kambaz/People/routes.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const CONNECTION_STRING =
    process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.set("trust proxy", 1);

app.use(
    cors({
             credentials: true,
             origin: [
                 process.env.NETLIFY_URL,
                 "https://nenemomo-neu-1998.netlify.app",
                 "http://localhost:5173"
             ]
         })
);

app.options('*', cors());

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
                                 mongoUrl: CONNECTION_STRING,
                                 collectionName: 'sessions',
                                 ttl: 24 * 60 * 60
                             })
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
       //domain: process.env.NODE_SERVER_DOMAIN || "kambaz-node-server-app-1-qg4v.onrender.com"
    };
}

app.use(session(sessionOptions));

app.use(express.json());


UserRoutes(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
enrollmentsRoutes(app);
PeopleRoutes(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
